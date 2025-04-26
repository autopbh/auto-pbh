
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CartDropdown = () => {
  // Mock cart items for the demo
  const cartItems = [
    {
      id: "v1",
      name: "Mercedes-Benz S-Class",
      price: 68900,
      image: "/images/mercedes-s-class-thumb.jpg"
    },
    {
      id: "v3",
      name: "Audi A8 L",
      price: 79900,
      image: "/images/audi-a8-thumb.jpg"
    }
  ];
  
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white dark:bg-autop-gray border border-border overflow-hidden z-50">
      <div className="py-2 px-4">
        <h3 className="text-lg font-medium mb-2">Votre Panier</h3>
        {cartItems.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4">Votre panier est vide</p>
        ) : (
          <>
            <div className="divide-y divide-border">
              {cartItems.map(item => (
                <div key={item.id} className="py-3 flex items-center space-x-3">
                  <div className="w-16 h-12 rounded overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-sm text-autop-red">€{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex justify-between mb-4">
                <p className="font-medium">Total</p>
                <p className="font-medium">€{totalPrice.toLocaleString()}</p>
              </div>
              <div className="space-y-2">
                <Link to="/cart">
                  <Button className="w-full" variant="outline">Voir le panier</Button>
                </Link>
                <Link to="/checkout">
                  <Button className="w-full btn-primary">Commander</Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDropdown;
