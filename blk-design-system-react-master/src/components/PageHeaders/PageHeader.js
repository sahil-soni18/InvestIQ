import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText } from "reactstrap";
import Fade from 'react-reveal/Fade';
import "../../assets/css/CustomCSS/Header.css";
import axios from "axios";

export default function PageHeader() {
  const [topGainers, setTopGainers] = useState([]);

  // useEffect(() => {
  //   const apiKey = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;

  //   // WebSocket is generally used for continuous data streams; however, the Alphavantage API does not support WebSocket.
  //   // This code uses a mock WebSocket approach for illustrative purposes.
  //   const wsData = new WebSocket(`wss://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${apiKey}`);

  //   wsData.onopen = () => {
  //     console.log("WebSocket connection opened");
  //   };

  //   wsData.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     setTopGainers(data.top_gainers.slice(0, 3));
  //     console.log(data);
  //   };

  //   wsData.onerror = (error) => {
  //     console.error("WebSocket error:", error);
  //   };

  //   wsData.onclose = () => {
  //     console.log("WebSocket connection closed");
  //   };

  //   return () => {
  //     wsData.close();
  //   };
  // }, []);

  // useEffect(() => {
  //   const apiKey = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
  //   axios.get(`https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${apiKey}`)
  //     .then((response) => {
  //       const data = response.data.top_gainers; // Ensure you access the correct path in the response
  //       setTopGainers(data.slice(0, 3)); // Limit to 3 items
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <div className="page-header header-filter">
      <div className="squares square1" />
      <div className="squares square2" />
      <div className="squares square3" />
      <div className="squares square4" />
      <div className="squares square5" />
      <div className="squares square6" />
      <div className="squares square7" />
      <Container>
        <Fade top>
          <div className="content-center brand">
            <h1 className="h1-seo">Master Your Investments</h1>
            <h3 className="d-none d-sm-block description">
              An Advanced Platform for Stock Analysis and Market Insights. Intuitive, Comprehensive, and Perfect for Both Beginners and Experts. Stay Informed, Stay Ahead.
            </h3>
          </div>
        </Fade>
        <Fade bottom>
          <Row className="stock-cards justify-content-center">
            {topGainers.map((stock, index) => (
              <Col md="4" sm="6" xs="12" key={index} className="mb-4">
                <Card className="stock-card">
                  <CardBody>
                    <CardTitle tag="h5">{stock.ticker}</CardTitle>
                    <CardText>
                      <strong>Current Price:</strong> {stock.price}
                    </CardText>
                    <CardText>
                      <strong>Change:</strong> {stock.change_amount}
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Fade>
      </Container>
    </div>
  );
}
