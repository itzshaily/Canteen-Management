import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

const ProductList = ({ products, addToCart, onProductClick }) => {
  console.log("🛒 ProductList received products:", products);
  
  if (!products || !Array.isArray(products) || products.length === 0) {
    return (
      <div className="text-center mt-5">
        <h4>No products available</h4>
      </div>
    );
  }

  return (
    <Row>
      {products.map((product, index) => {
        // Use index as fallback if product.id is invalid
        const productKey = product?.id || index;
        const productName = product?.name || `Product ${index}`;
        const productPrice = product?.price || 0;
        const productQuantity = product?.quantity || 0;
        const productImage = product?.image || "";
        
        console.log(`🛒 Rendering product ${index}:`, {
          key: productKey,
          name: productName,
          price: productPrice,
          quantity: productQuantity
        });
        
        return (
          <Col key={productKey} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="h-100 shadow-sm border-0 rounded-3 overflow-hidden">
              <div 
                style={{ height: "200px", overflow: "hidden" }}
                onClick={() => onProductClick && onProductClick(product)}
                className="cursor-pointer"
              >
                {productImage ? (
                  <Card.Img
                    variant="top"
                    src={productImage}
                    alt={productName}
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover" 
                    }}
                    onError={(e) => {
                      console.error(`Image failed to load for ${productName}:`, productImage);
                      e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                    }}
                  />
                ) : (
                  <div 
                    className="d-flex align-items-center justify-content-center bg-light"
                    style={{ height: "100%" }}
                  >
                    <span className="text-muted">No Image</span>
                  </div>
                )}
              </div>
              
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold text-dark">
                  {productName}
                </Card.Title>
                <Card.Text className="text-muted small flex-grow-1">
                  {product?.description || "No description available"}
                </Card.Text>
                <div className="mt-auto">
                  <p className="mb-1">
                    <strong>Price: ₹{productPrice}</strong>
                  </p>
                  <p className="mb-3 text-muted">
                    <strong>Quantity: {productQuantity}</strong>
                  </p>
                  <div className="d-flex gap-2">
                    <Button 
                      variant="outline-secondary" 
                      size="sm"
                      onClick={() => onProductClick && onProductClick(product)}
                    >
                      View details
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => addToCart(product)}
                      disabled={productQuantity <= 0}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default ProductList;
