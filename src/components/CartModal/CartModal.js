import React from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CartModal.css";

const CartModal = ({
  show,
  handleClose,
  cart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
  calculateTotal,
  checkout,
}) => {
  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      centered 
      className="cart-modal"
      size="lg"
    >
      <Modal.Header 
        closeButton 
        className="border-0"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "1rem 1rem 0 0"
        }}
      >
        <Modal.Title className="fw-bold text-white d-flex align-items-center">
          <i className="bi bi-cart3 me-2"></i>
          Your Cart ({cart.length} items)
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4" style={{ maxHeight: "60vh", overflowY: "auto" }}>
        {cart.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-cart-x text-muted" style={{ fontSize: "3rem" }}></i>
            <p className="text-muted mt-3 mb-0">Your cart is empty</p>
          </div>
        ) : (
          <>
            {cart.map((product, index) => (
              <div
                key={product.id}
                className="d-flex justify-content-between align-items-center p-3 mb-3 rounded-3 shadow-sm"
                style={{ 
                  background: "rgba(102, 126, 234, 0.02)",
                  border: "1px solid rgba(102, 126, 234, 0.1)"
                }}
              >
                <div className="d-flex align-items-center">
                  <img
                    className="rounded-3 me-3 shadow-sm"
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <h6 className="mb-1 fw-bold text-dark">{product.name}</h6>
                    <p className="mb-0 text-success fw-semibold">₹{product.price}</p>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center gap-2">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "32px", height: "32px" }}
                      onClick={() => decrementQuantity(product.id)}
                    >
                      <i className="bi bi-dash"></i>
                    </Button>
                    
                    <span 
                      className="fw-bold px-3 py-1 rounded-pill"
                      style={{ 
                        background: "rgba(102, 126, 234, 0.1)",
                        minWidth: "40px",
                        textAlign: "center"
                      }}
                    >
                      {product.quantity}
                    </span>
                    
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "32px", height: "32px" }}
                      onClick={() => incrementQuantity(product.id)}
                    >
                      <i className="bi bi-plus"></i>
                    </Button>
                  </div>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="rounded-pill"
                    onClick={() => removeFromCart(product)}
                  >
                    <i className="bi bi-trash3"></i>
                  </Button>
                </div>
              </div>
            ))}
          </>
        )}
      </Modal.Body>

      {cart.length > 0 && (
        <Modal.Footer 
          className="border-0 d-flex justify-content-between align-items-center p-4"
          style={{ background: "rgba(102, 126, 234, 0.02)" }}
        >
          <h4 className="fw-bold text-dark mb-0">
            Total: <span className="text-success">₹{calculateTotal()}</span>
          </h4>
          
          <div className="d-flex gap-2">
            <Button
              variant="outline-danger"
              className="rounded-pill fw-semibold"
              onClick={clearCart}
            >
              <i className="bi bi-trash3 me-2"></i>
              Clear All
            </Button>
            <Button 
              className="rounded-pill fw-semibold px-4 border-0"
              style={{
                background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)"
              }}
              onClick={checkout}
            >
              <i className="bi bi-credit-card me-2"></i>
              Checkout
            </Button>
          </div>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default CartModal;



//show: Boolean, controls modal visibility.

//handleClose: Function to close the modal.

//cart: Array of cart product objects.

//incrementQuantity, decrementQuantity: Functions to increase/decrease product quantity.

//removeFromCart: Removes a product from the cart.

//clearCart: Empties the entire cart.

//calculateTotal: Calculates total cost of items.

//checkout: Initiates the checkout process.