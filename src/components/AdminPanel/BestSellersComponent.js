import React from "react";
import { Card, Table } from "react-bootstrap";

const BestSellersComponent = ({ bestSellers }) => (
  <Card className="mb-4">
    <Card.Header>Best-Selling Products</Card.Header>
    <Card.Body>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity Sold</th>
            </tr>
          </thead>
          <tbody>
            {bestSellers.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Card.Body>
  </Card>
);

export default BestSellersComponent;


//BestSellersComponent is a simple presentational component.

//It receives a list of best-seller products and their sold quantities, and displays them in a styled, responsive table within a Bootstrap card.

//No internal logic, API calls, or state: all data is received as props.