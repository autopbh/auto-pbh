
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@1.0.0";

// Initialize Resend with API key from environment variables
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Interface for order confirmation request
interface OrderConfirmationRequest {
  orderReference: string;
  customerName: string;
  customerEmail: string;
  totalPrice: number;
  depositAmount: number;
  remainingAmount: number;
  estimatedDelivery: string;
  cartItems: Array<{ name: string; price: number }>;
  paymentReceiptUrl?: string;
}

// Handle requests
serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { 
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  try {
    // Parse request body
    const {
      orderReference,
      customerName,
      customerEmail,
      totalPrice,
      depositAmount,
      remainingAmount,
      estimatedDelivery,
      cartItems,
      paymentReceiptUrl
    }: OrderConfirmationRequest = await req.json();

    // Log info about the order
    console.log(`Sending order confirmation for order ${orderReference} to ${customerEmail}`);
    
    // Format prices for email
    const formatPrice = (price: number) => price.toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    // Generate items HTML for email
    const itemsHtml = cartItems.map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${formatPrice(item.price)} €</td>
      </tr>
    `).join('');

    // Send email to customer - Using Resend's default sender domain instead of autopbh.com
    const { data: customerEmailData, error: customerEmailError } = await resend.emails.send({
      from: "AutoPBH <onboarding@resend.dev>",
      to: customerEmail,
      subject: `Confirmation de commande - ${orderReference}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="background-color: #f8f8f8; padding: 20px; margin-bottom: 20px; text-align: center;">
            <h1 style="color: #e63946; margin: 0;">AutoPBH</h1>
            <p style="margin: 5px 0 0;">Merci pour votre commande</p>
          </div>
          
          <p>Bonjour ${customerName},</p>
          
          <p>Nous avons bien reçu votre commande <strong>${orderReference}</strong> ainsi que votre preuve de paiement. Votre acompte a été validé.</p>
          
          <div style="background-color: #f5f5f5; border-left: 4px solid #e63946; padding: 15px; margin: 20px 0;">
            <p style="margin: 0 0 10px; font-weight: bold;">Livraison estimée</p>
            <p style="margin: 0;">${estimatedDelivery}</p>
          </div>
          
          <h2 style="border-bottom: 2px solid #eee; padding-bottom: 10px;">Récapitulatif de votre commande</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background-color: #f5f5f5;">
                <th style="padding: 10px; text-align: left;">Véhicule</th>
                <th style="padding: 10px; text-align: right;">Prix</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
              <tr style="font-weight: bold;">
                <td style="padding: 10px; border-top: 2px solid #eee;">Total</td>
                <td style="padding: 10px; border-top: 2px solid #eee; text-align: right;">${formatPrice(totalPrice)} €</td>
              </tr>
            </tbody>
          </table>
          
          <div style="display: flex; margin: 20px 0;">
            <div style="flex: 1; background-color: #f0fff4; border: 1px solid #68d391; padding: 15px; margin-right: 10px;">
              <p style="font-weight: bold; margin: 0 0 10px;">Acompte versé</p>
              <p style="font-size: 18px; font-weight: bold; margin: 0;">${formatPrice(depositAmount)} €</p>
              <p style="color: #68d391; margin: 5px 0 0; font-size: 12px;">Paiement reçu</p>
            </div>
            <div style="flex: 1; background-color: #ebf8ff; border: 1px solid #63b3ed; padding: 15px; margin-left: 10px;">
              <p style="font-weight: bold; margin: 0 0 10px;">Solde restant</p>
              <p style="font-size: 18px; font-weight: bold; margin: 0;">${formatPrice(remainingAmount)} €</p>
              <p style="color: #63b3ed; margin: 5px 0 0; font-size: 12px;">À payer à la livraison</p>
            </div>
          </div>
          
          <p>Notre équipe vous contactera dans les 24-48h pour finaliser les détails de livraison.</p>
          
          <p style="margin-top: 30px;">Cordialement,</p>
          <p><strong>L'équipe AutoPBH</strong></p>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #777; text-align: center;">
            <p>AutoPBH SAS • 123 Avenue de l'Automobile, 75001 Paris • +33 1 23 45 67 89</p>
          </div>
        </div>
      `,
    });

    if (customerEmailError) {
      console.error("Error sending customer email:", customerEmailError);
      throw new Error(`Failed to send customer email: ${customerEmailError.message}`);
    }
    
    // Send notification email to admin - Using Resend's default sender domain instead of autopbh.com
    const { data: adminEmailData, error: adminEmailError } = await resend.emails.send({
      from: "AutoPBH <onboarding@resend.dev>",
      to: "admin@autopbh.com", // Replace with your admin email
      subject: `Nouvelle commande: ${orderReference}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h1 style="color: #e63946;">Nouvelle commande</h1>
          
          <p><strong>Référence:</strong> ${orderReference}</p>
          <p><strong>Client:</strong> ${customerName}</p>
          <p><strong>Email:</strong> ${customerEmail}</p>
          <p><strong>Total:</strong> ${formatPrice(totalPrice)} €</p>
          <p><strong>Acompte versé:</strong> ${formatPrice(depositAmount)} €</p>
          <p><strong>Livraison estimée:</strong> ${estimatedDelivery}</p>
          
          ${paymentReceiptUrl ? `<p><strong>Preuve de paiement:</strong> <a href="${paymentReceiptUrl}">Voir le reçu</a></p>` : ''}
          
          <h2>Détails de la commande</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f5f5f5;">
                <th style="padding: 10px; text-align: left;">Véhicule</th>
                <th style="padding: 10px; text-align: right;">Prix</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
        </div>
      `,
    });
    
    if (adminEmailError) {
      console.error("Error sending admin email:", adminEmailError);
      // We still continue even if admin email fails, just log it
    }

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Order confirmation emails sent successfully"
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error in send-order-confirmation function:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Failed to send order confirmation"
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
