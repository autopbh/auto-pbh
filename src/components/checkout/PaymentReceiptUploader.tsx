
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface PaymentReceiptUploaderProps {
  onUploadComplete: (url: string) => void;
  orderReference: string;
}

const PaymentReceiptUploader = ({ onUploadComplete, orderReference }: PaymentReceiptUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    // Check file type
    if (!file.type.match('image.*')) {
      toast({
        title: "Format non pris en charge",
        description: "Veuillez télécharger une image (JPG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Fichier trop volumineux",
        description: "La taille du fichier ne doit pas dépasser 5 Mo",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    setFileName(file.name);
    
    try {
      // Create a preview of the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${orderReference}_${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('payment-receipts')
        .upload(fileName, file);

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('payment-receipts')
        .getPublicUrl(fileName);

      setIsUploading(false);
      onUploadComplete(publicUrl);
      
      toast({
        title: "Preuve de paiement téléchargée",
        description: `Fichier "${file.name}" téléchargé avec succès.`
      });

    } catch (error) {
      console.error('Upload error:', error);
      setIsUploading(false);
      toast({
        title: "Erreur de téléchargement",
        description: "Une erreur est survenue lors du téléchargement. Veuillez réessayer.",
        variant: "destructive"
      });
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        aria-label="Télécharger la preuve de paiement"
      />
      
      {preview ? (
        <Card className="overflow-hidden border-2 border-green-500">
          <CardContent className="p-0">
            <div className="relative">
              <img 
                src={preview} 
                alt="Preuve de paiement" 
                className="w-full h-auto max-h-80 object-contain bg-white"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-green-100 text-green-800 py-2 px-3 text-sm">
                {orderReference} - Preuve de paiement téléchargée
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button
          onClick={triggerFileInput}
          disabled={isUploading}
          variant="outline"
          className="w-full py-8 border-dashed border-2 flex flex-col items-center justify-center space-y-2"
        >
          <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
          <span className="font-medium">{isUploading ? "Téléchargement..." : "Télécharger le justificatif de paiement"}</span>
          <span className="text-sm text-muted-foreground">
            Formats acceptés: JPG, PNG, HEIC (Max: 5MB)
          </span>
        </Button>
      )}
      
      {preview && (
        <Button
          onClick={triggerFileInput}
          variant="outline"
          className="w-full"
        >
          <Upload className="h-4 w-4 mr-2" />
          Remplacer l'image
        </Button>
      )}
    </div>
  );
};

export default PaymentReceiptUploader;
