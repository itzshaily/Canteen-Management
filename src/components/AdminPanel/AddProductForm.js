import React, { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { ref, push } from "firebase/database";
import { database } from "../../firebase";

const AddProductForm = () => {
  const [initialPrices, setInitialPrices] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const newProduct = {
        name: productName,
        initialPrices: parseFloat(initialPrices),
        price: parseFloat(productPrice),
        description: productDescription,
        image: productImage,
        quantity: 0,
      };

      const productsRef = ref(database, "products");
      await push(productsRef, newProduct);

      // Reset the form
      setProductName("");
      setInitialPrices("");
      setProductPrice("");
      setProductDescription("");
      setProductImage("");

      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <Card 
      className="mb-4 border-0 shadow-lg"
      style={{ borderRadius: "1rem" }}
    >
      <Card.Header 
        className="border-0 text-white fw-bold py-3"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "1rem 1rem 0 0"
        }}
      >
        <i className="bi bi-plus-circle me-2"></i>
        Add New Product
      </Card.Header>
      <Card.Body className="p-4">
        <Form onSubmit={handleAddProduct}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                  className="border-0 shadow-sm rounded-3 py-2"
                  style={{ background: "rgba(102, 126, 234, 0.05)" }}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Initial Price (₹)</Form.Label>
                <Form.Control
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="Enter initial price"
                  value={initialPrices}
                  onChange={(e) => setInitialPrices(e.target.value)}
                  required
                  className="border-0 shadow-sm rounded-3 py-2"
                  style={{ background: "rgba(102, 126, 234, 0.05)" }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Current Price (₹)</Form.Label>
                <Form.Control
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="Enter current price"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  required
                  className="border-0 shadow-sm rounded-3 py-2"
                  style={{ background: "rgba(102, 126, 234, 0.05)" }}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Image URL</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="Enter image URL"
                  value={productImage}
                  onChange={(e) => setProductImage(e.target.value)}
                  required
                  className="border-0 shadow-sm rounded-3 py-2"
                  style={{ background: "rgba(102, 126, 234, 0.05)" }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
              className="border-0 shadow-sm rounded-3"
              style={{ background: "rgba(102, 126, 234, 0.05)" }}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100 py-3 fw-bold border-0 rounded-3"
            style={{
              background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
              fontSize: "16px"
            }}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add Product
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddProductForm;
