import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductList from "../ProductList/ProductList";
import CartModal from "../CartModal/CartModal";
import ProductDetailModal from "../ProductDetail/ProductDetailModal";
import Footer from "../Footer/Footer";
import AdminPanel from "../AdminPanel/AdminPanel";
import UserOrderHistory from "./UserOrderHistory";
import useProducts from "../../hooks/useProducts";
import { ref, update, get } from "firebase/database";
import { auth, database } from "../../firebase";
import { signOut } from "firebase/auth";
import { Toast, Form, InputGroup, Container, Button } from "react-bootstrap";
import { useAuth } from "../../AuthContext";
import jsPDF from "jspdf";
import useAdmin from "../../hooks/useAdmin";
import Logo from '../Logo/Logo';

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { products, updateProductQuantity, loading, error } = useProducts();
  
  // State variables
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [originalQuantities, setOriginalQuantities] = useState({});
  const [showCheckoutToast, setShowCheckoutToast] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductDetailModal, setShowProductDetailModal] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const isAdmin = useAdmin();

  // ProfileAvatar component
  const ProfileAvatar = () => (
    <img
      src={`https://ui-avatars.com/api/?name=${currentUser?.email || 'User'}&background=36b1f0&color=fff`}
      alt="profile"
      className="rounded-circle shadow-sm border border-3 border-info"
      width="36"
      height="36"
      style={{ objectFit: "cover" }}
    />
  );

  // Debug Firebase connection
  const testFirebase = async () => {
    try {
      console.log("🔥 Testing Firebase connection...");
      const productsRef = ref(database, "products");
      const snapshot = await get(productsRef);
      
      if (snapshot.exists()) {
        console.log("🔥 Firebase test SUCCESS:", snapshot.val());
        alert("Firebase connection works! Check console for data.");
      } else {
        console.log("🔥 Firebase test - No data found");
        alert("Firebase connected but no products found");
      }
    } catch (error) {
      console.error("🔥 Firebase test ERROR:", error);
      alert("Firebase connection failed: " + error.message);
    }
  };

  // DEBUG: Log products when they load
  useEffect(() => {
    console.log("🏠 Home component - Products:", products);
    console.log("🏠 Home component - Loading:", loading);
    console.log("🏠 Home component - Error:", error);
    console.log("🏠 Home component - Products type:", typeof products);
    console.log("🏠 Home component - Is array:", Array.isArray(products));
    
    if (products && Array.isArray(products)) {
      products.forEach((product, index) => {
        console.log(`🏠 Product ${index}:`, product);
        if (!product || !product.name) {
          console.error('🏠 Product missing name:', product);
        }
      });
    }
  }, [products, loading, error]);

  useEffect(() => {
    if (products && products.length > 0) {
      const updatedQuantities = products.reduce((acc, product) => {
        if (product && product.id) {
          acc[product.id] = product.quantity || 0;
        }
        return acc;
      }, {});
      setOriginalQuantities(updatedQuantities);
    }
  }, [products]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (!currentUser) {
      setShowAdmin(false);
    }
  }, [currentUser]);

  // PDF Generation
  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    // Header
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("TASTYBITES RECEIPT", pageWidth / 2, 15, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${date}`, 10, 30);
    doc.text(`Time: ${time}`, 10, 37);
    doc.text(`Customer: ${currentUser?.displayName || currentUser?.email}`, 10, 44);

    // Line separator
    doc.setLineWidth(0.5);
    doc.line(10, 50, pageWidth - 10, 50);

    // Column headers
    doc.setFont("helvetica", "bold");
    doc.text("Item", 10, 60);
    doc.text("Qty", 120, 60, { align: "right" });
    doc.text("Price", 140, 60, { align: "right" });
    doc.text("Amount", 190, 60, { align: "right" });

    // Items
    doc.setFont("helvetica", "normal");
    let y = 70;
    cart.forEach((product) => {
      if (product && product.name) {
        doc.text(product.name, 10, y);
        doc.text(product.quantity.toString(), 120, y, { align: "right" });
        doc.text(product.price.toFixed(2), 140, y, { align: "right" });
        doc.text((product.quantity * product.price).toFixed(2), 190, y, { align: "right" });
        y += 10;
      }
    });

    // Footer
    const totalY = y + 10;
    doc.line(10, totalY - 5, pageWidth - 10, totalY - 5);
    doc.setFont("helvetica", "bold");
    doc.text("Total Amount:", 140, totalY, { align: "right" });
    doc.text(`₹${calculateTotal().toFixed(2)}`, 190, totalY, { align: "right" });

    // Thank you note
    doc.setFontSize(14);
    doc.setFont("helvetica", "italic");
    doc.text("Thank you for dining with us!", pageWidth / 2, totalY + 20, { align: "center" });

    doc.save(`TastyBites-Bill-${date.replace(/\//g, "-")}-${time.replace(/:/g, "-")}.pdf`);
  };

  // Cart functions
  const addToCart = (product) => {
    if (!product || !product.id) {
      console.error('Invalid product:', product);
      return;
    }

    setCart((prevCart) => {
      const productInCart = prevCart.find((p) => p.id === product.id);
      if (productInCart) {
        return prevCart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setShowCartModal(true);
  };

  const incrementQuantity = (productId) => {
    const availableQuantity = originalQuantities[productId] - (cart.find((p) => p.id === productId)?.quantity || 0);
    if (availableQuantity > 0) {
      setCart((prevCart) =>
        prevCart.map((p) => p.id === productId ? { ...p, quantity: p.quantity + 1 } : p)
      );
    }
  };

  const decrementQuantity = (productId) => {
    const productInCart = cart.find((p) => p.id === productId);
    if (productInCart && productInCart.quantity > 1) {
      setCart((prevCart) =>
        prevCart.map((p) => p.id === productId ? { ...p, quantity: p.quantity - 1 } : p)
      );
    }
  };

  const removeFromCart = (product) => {
    if (product && product.id) {
      setCart((prevCart) => prevCart.filter((p) => p.id !== product.id));
    }
  };

  const clearCart = () => setCart([]);

  const calculateTotal = () => {
    return cart.reduce((total, product) => {
      if (product && typeof product.price === 'number' && typeof product.quantity === 'number') {
        return total + product.price * product.quantity;
      }
      return total;
    }, 0);
  };

  // Checkout function
  const checkout = () => {
    cart.forEach((product) => {
      if (product && product.id && originalQuantities[product.id] !== undefined) {
        const originalQuantity = originalQuantities[product.id];
        const updatedQuantity = originalQuantity - product.quantity;
        const productRef = ref(database, `products/${product.id}`);
        
        update(productRef, { quantity: Math.max(0, updatedQuantity) })
          .then(() => {
            updateProductQuantity(product.id, Math.max(0, updatedQuantity));
            setOriginalQuantities((prev) => ({
              ...prev,
              [product.id]: Math.max(0, updatedQuantity),
            }));
          })
          .catch((error) => console.error("Error updating product quantity:", error));
      }
    });

    // Record sales data
    const checkoutDate = new Date().toISOString().split("T")[0];
    const saleRef = ref(database, `sales/${checkoutDate}`);
    const saleId = Date.now().toString();
    const saleData = {
      [saleId]: {
        total: calculateTotal(),
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        userId: currentUser?.uid,
        userEmail: currentUser?.email,
        timestamp: Date.now(),
      },
    };
    update(saleRef, saleData);

    setCart([]);
    setShowCartModal(false);
    setShowCheckoutToast(true);
    setTimeout(() => setShowCheckoutToast(false), 3000);
    generatePDF();
  };

  // Safe product filtering
  const filteredProducts = React.useMemo(() => {
    if (!products || !Array.isArray(products)) {
      console.warn('🏠 Products not loaded or not an array:', products);
      return [];
    }
    
    if (!searchTerm || searchTerm.trim() === '') {
      return products;
    }
    
    return products.filter((product) => {
      try {
        if (!product || !product.name) {
          console.warn('🏠 Product missing name:', product);
          return false;
        }
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
      } catch (error) {
        console.error('🏠 Error filtering product:', product, error);
        return false;
      }
    });
  }, [products, searchTerm]);

  const handleProductClick = (product) => {
    if (product) {
      setSelectedProduct(product);
      setShowProductDetailModal(true);
    }
  };

  const handleLogout = async () => {
    try {
      setLogoutError("");
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      setLogoutError("Failed to log out. Please try again.");
    }
  };

  const handleAdminClick = () => {
    if (isAdmin) {
      setShowAdmin(true);
      setShowOrderHistory(false);
    }
  };

  const handleHomeClick = () => {
    setShowAdmin(false);
    setShowOrderHistory(false);
  };

  // Loading state
  if (loading) {
    return (
      <Container className="text-center mt-5">
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <h4 className="mt-3">Loading products...</h4>
        <p className="text-muted">Please wait while we fetch the menu...</p>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container className="text-center mt-5">
        <div className="alert alert-danger">
          <h4>⚠️ Error loading products</h4>
          <p><strong>Error:</strong> {error}</p>
          <div className="mt-3">
            <button className="btn btn-primary me-2" onClick={() => window.location.reload()}>
              🔄 Retry
            </button>
            <button className="btn btn-info" onClick={testFirebase}>
              🔥 Test Firebase Connection
            </button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <>
      <header 
        className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column" 
        style={{ background: "linear-gradient(135deg, #e0f7fa, #ffffff)" }}
      >
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <Logo 
            onClick={handleHomeClick}
            size="medium"
          />
          
          <nav className="nav nav-masthead d-flex align-items-center gap-3">
            <Button variant="link" onClick={handleHomeClick} className="nav-btn">
              <i className="bi bi-house-door-fill me-2"></i> Home
            </Button>
            <Button
              variant="link"
              onClick={() => {
                setShowOrderHistory(true);
                setShowAdmin(false);
              }}
              className="nav-btn"
            >
              <i className="bi bi-clock-history me-2"></i> My Orders
            </Button>
            {isAdmin && (
              <Button variant="link" onClick={handleAdminClick} className="nav-btn">
                <i className="bi bi-shield-lock-fill me-2"></i> Admin
              </Button>
            )}
            {currentUser && (
              <div className="d-flex align-items-center fw-bold gap-3">
                <ProfileAvatar />
                <Button
                  variant="danger"
                  size="sm"
                  className="rounded-pill fw-bold logout-btn"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-1"></i> Logout
                </Button>
              </div>
            )}
          </nav>
        </div>
      </header>

      <Container className="mt-5 flex-grow-1">
        {logoutError && (
          <Toast
            show={!!logoutError}
            onClose={() => setLogoutError("")}
            className="position-fixed top-0 end-0 m-3 shadow"
            bg="danger"
            text="white"
          >
            <Toast.Body>{logoutError}</Toast.Body>
          </Toast>
        )}

        {showAdmin ? (
          <AdminPanel />
        ) : showOrderHistory ? (
          <UserOrderHistory />
        ) : (
          <>

            <div className="d-flex justify-content-between align-items-center mb-4 row">
              <h1 className="fw-bold col">Today's items</h1>
              <Form.Group className="w-100 w-md-50 my-auto col">
                <InputGroup className="shadow-sm rounded-pill">
                  <InputGroup.Text style={{ background: "#e0f7fa", borderRadius: "50px 0 0 50px" }}>
                    <i className="bi bi-search"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ borderRadius: "0 50px 50px 0" }}
                  />
                </InputGroup>
              </Form.Group>
            </div>
            
            {cart.length > 0 && (
              <Button
                variant="primary"
                className="rounded-pill fw-bold shadow mb-4"
                onClick={() => setShowCartModal(true)}
              >
                <i className="bi bi-cart3 me-2"></i>
                View Cart ({cart.length})
              </Button>
            )}

            {filteredProducts.length > 0 ? (
              <ProductList
                products={filteredProducts.map((p) => ({
                  ...p,
                  quantity: Math.max(0,
                    (originalQuantities[p.id] || 0) -
                    (cart.find((cp) => cp.id === p.id)?.quantity || 0)
                  ),
                }))}
                addToCart={addToCart}
                onProductClick={handleProductClick}
              />
            ) : (
              <div className="text-center mt-5">
                <i className="bi bi-emoji-frown text-muted" style={{ fontSize: "4rem" }}></i>
                <h3 className="mt-3">Sorry, we're currently not serving any items.</h3>
                <p className="text-muted">
                  Please check back later or contact{" "}
                  <a
                    className="text-decoration-none"
                    href="https://github.com/itzshaily/"
                    style={{ color: "#667eea" }}
                  >
                    maintainer
                  </a>
                  !
                </p>
              </div>
            )}

            <CartModal
              show={showCartModal}
              handleClose={() => setShowCartModal(false)}
              cart={cart}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
              calculateTotal={calculateTotal}
              checkout={checkout}
            />
            
            <ProductDetailModal
              show={showProductDetailModal}
              handleClose={() => setShowProductDetailModal(false)}
              product={selectedProduct}
              addToCart={addToCart}
            />
            
            <Toast
              show={showCheckoutToast}
              onClose={() => setShowCheckoutToast(false)}
              className="position-fixed bottom-0 end-0 m-3 shadow"
              delay={3000}
              autohide
            >
              <Toast.Body>
                <i className="bi bi-check-circle me-2 text-success"></i>
                Checkout successful!
              </Toast.Body>
            </Toast>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Home;
