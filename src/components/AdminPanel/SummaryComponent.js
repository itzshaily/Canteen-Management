import React from "react";
import { Card, Table } from "react-bootstrap";

const SummaryComponent = ({ data, title }) => {
  const totalProfit = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="mb-4">
      <Card.Header>{title} Summary</Card.Header>
      <Card.Body>
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Profit (₹)</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>₹{item.value.toFixed(2)}</td>
                  <td>{((item.value / totalProfit) * 100).toFixed(2)}%</td>
                </tr>
              ))}
              <tr className="table-info">
                <td><strong>Total</strong></td>
                <td><strong>₹{totalProfit.toFixed(2)}</strong></td>
                <td>100%</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SummaryComponent;


// This component summarizes profit data clearly by product with calculated percentages.

//Ideal for showing profit distribution in weekly, monthly, or yearly views.

//Uses Bootstrap styles for mobile-friendly, clean tables.

//Stateless and fully controlled by props: easy to reuse with any numeric data array.