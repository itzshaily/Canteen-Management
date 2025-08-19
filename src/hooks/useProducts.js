import { useState, useEffect } from "react";
import { ref, onValue, update } from "firebase/database";
import { database } from "../firebase";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("🔥 useProducts: Starting Firebase connection...");
    
    // Point to the root database to read the correct structure
    const rootRef = ref(database, "/");
    
    const unsubscribe = onValue(
      rootRef,
      (snapshot) => {
        console.log("🔥 useProducts: Root snapshot received");
        
        try {
          if (snapshot.exists()) {
            const rootData = snapshot.val();
            console.log("🔥 useProducts: Root data:", rootData);
            
            // Check if products exist at root level or nested
            let productsData = null;
            
            if (rootData.products && typeof rootData.products === 'object') {
              // Check if products has nested products
              if (rootData.products.products) {
                console.log("🔥 Found nested products structure");
                productsData = rootData.products.products;
              } else {
                // Check if products node has numbered children
                const productKeys = Object.keys(rootData.products).filter(key => 
                  !isNaN(key) && rootData.products[key] && rootData.products[key].name
                );
                if (productKeys.length > 0) {
                  console.log("🔥 Found products with numbered keys");
                  productsData = {};
                  productKeys.forEach(key => {
                    productsData[key] = rootData.products[key];
                  });
                }
              }
            }
            
            console.log("🔥 Final products data:", productsData);
            
            if (productsData && typeof productsData === 'object') {
              const productsArray = Object.keys(productsData).map((key) => {
                const item = productsData[key];
                if (item && typeof item === 'object' && item.name) {
                  return {
                    id: item.id || parseInt(key),
                    name: item.name,
                    price: Number(item.price) || 0,
                    quantity: Number(item.quantity) || 0,
                    description: item.description || "",
                    image: item.image || "",
                    initialPrice: Number(item.initialPrice) || 0,
                  };
                }
                return null;
              }).filter(item => item !== null);
              
              console.log("🔥 useProducts: Final processed array:", productsArray);
              setProducts(productsArray);
              setError(null);
            } else {
              console.warn("🔥 useProducts: No valid products found");
              setProducts([]);
              setError("No products found");
            }
          } else {
            console.warn("🔥 useProducts: No data found");
            setProducts([]);
            setError("No data found");
          }
        } catch (err) {
          console.error("🔥 useProducts: Error processing data:", err);
          setError(err.message);
          setProducts([]);
        } finally {
          setLoading(false);
        }
      },
      (firebaseError) => {
        console.error("🔥 useProducts: Firebase error:", firebaseError);
        setError(`Firebase connection error: ${firebaseError.message}`);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const updateProductQuantity = (productId, newQuantity) => {
    // Update at the correct path based on your structure
    const productRef = ref(database, `products/${productId}`);
    return update(productRef, { quantity: newQuantity });
  };

  return { products, updateProductQuantity, loading, error };
};

export default useProducts;
