import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      // If no cart items, redirect back to catalog
      navigate("/catalog");
    }
  }, [navigate]);

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h1 className="text-3xl font-bold text-center mb-8">Commande</h1>
              
              {cartItems.length > 0 ? (
                <div className="space-y-6">
                  <div className="divide-y divide-border border rounded-lg">
                    {cartItems.map(item => (
                      <div key={item.id} className="p-4 flex items-center space-x-4">
                        <div className="w-24 h-16 rounded overflow-hidden bg-gray-100">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-autop-red text-lg">{item.price.toLocaleString('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} €</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-autop-red">{totalPrice.toLocaleString('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} €</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-gray-600">Le processus de commande a été simplifié</p>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-600">Aucun article dans le panier</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;