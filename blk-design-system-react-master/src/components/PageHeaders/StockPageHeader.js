// import React from "react";
// import { Container, Row, Col, Card, CardBody, CardTitle, Table } from "reactstrap";
// import "../../assets/css/CustomCSS/StockHeader.css";

// export default function StockPageHeader({ stockData }) {
//   const metaData = stockData["Meta Data"];
//   const timeSeries = stockData["Time Series (Daily)"];
//   const latestDate = Object.keys(timeSeries)[0];
//   const data = timeSeries[latestDate];

//   return (
//     <div className="stock-page-header">
//       <Container>
//         <Row className="justify-content-center">
//           <Col md="8" className="text-center mb-4">
//             <h1 className="display-4">{metaData["2. Symbol"]} - {data["4. close"]}</h1>
//             <p className="lead">{metaData["1. Information"]}</p>
//             <p>Last Refreshed: {metaData["3. Last Refreshed"]}</p>
//           </Col>
//         </Row>
//         <Row className="justify-content-center">
//           <Col md="8">
//             <Card>
//               <CardBody>
//                 <Row>
//                   <Col>
//                     <CardTitle tag="h5">Stock Overview</CardTitle>
//                     <Table>
//                       <tbody>
//                         <tr>
//                           <th scope="row">Open</th>
//                           <td>{data["1. open"]}</td>
//                         </tr>
//                         <tr>
//                           <th scope="row">High</th>
//                           <td>{data["2. high"]}</td>
//                         </tr>
//                         <tr>
//                           <th scope="row">Low</th>
//                           <td>{data["3. low"]}</td>
//                         </tr>
//                         <tr>
//                           <th scope="row">Close</th>
//                           <td>{data["4. close"]}</td>
//                         </tr>
//                         <tr>
//                           <th scope="row">Volume</th>
//                           <td>{data["5. volume"]}</td>
//                         </tr>
//                       </tbody>
//                     </Table>
//                   </Col>
//                   <Col>
//                     <CardTitle tag="h5">Performance</CardTitle>
//                     <p>Previous Close: {timeSeries[Object.keys(timeSeries)[1]]["4. close"]}</p>
//                     <p>Current Close: {data["4. close"]}</p>
//                     <p>
//                       Change:{" "}
//                       {(
//                         ((data["4. close"] - timeSeries[Object.keys(timeSeries)[1]]["4. close"]) /
//                           timeSeries[Object.keys(timeSeries)[1]]["4. close"]) *
//                         100
//                       ).toFixed(2)}
//                       %
//                     </p>
//                   </Col>
//                 </Row>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }

// import React from "react";
// import { Container, Row, Col, Card, CardBody, CardTitle, Table } from "reactstrap";
// import "../../assets/css/CustomCSS/StockHeader.css";

// export default function StockPageHeader({ stockData }) {
//   const metaData = stockData["Meta Data"];
//   const timeSeries = stockData["Time Series (Daily)"];
//   const latestDate = Object.keys(timeSeries)[0];
//   const data = timeSeries[latestDate];

//   return (
//     <div className="stock-page-header">
//       <Container>
//         <Row className="justify-content-center">
//           <Col md="8" className="text-center mb-4">
//             <h1 className="display-4">{metaData["2. Symbol"]} - {data["4. close"]}</h1>
//             <p className="lead">{metaData["1. Information"]}</p>
//             <p>Last Refreshed: {metaData["3. Last Refreshed"]}</p>
//           </Col>
//         </Row>
//         <Row className="justify-content-center">
//           <Col md="8">
//             <Card>
//               <CardBody>
//                 <Row>
//                   <Col>
//                     <CardTitle tag="h5">Stock Overview</CardTitle>
//                     <Table>
//                       <tbody>
//                         <tr>
//                           <th scope="row">Open</th>
//                           <td>{data["1. open"]}</td>
//                         </tr>
//                         <tr>
//                           <th scope="row">High</th>
//                           <td>{data["2. high"]}</td>
//                         </tr>
//                         <tr>
//                           <th scope="row">Low</th>
//                           <td>{data["3. low"]}</td>
//                         </tr>
//                         <tr>
//                           <th scope="row">Close</th>
//                           <td>{data["4. close"]}</td>
//                         </tr>
//                         <tr>
//                           <th scope="row">Volume</th>
//                           <td>{data["5. volume"]}</td>
//                         </tr>
//                       </tbody>
//                     </Table>
//                   </Col>
//                   <Col>
//                     <CardTitle tag="h5">Performance</CardTitle>
//                     <p>Previous Close: {timeSeries[Object.keys(timeSeries)[1]]["4. close"]}</p>
//                     <p>Current Close: {data["4. close"]}</p>
//                     <p>
//                       Change:{" "}
//                       {(
//                         ((data["4. close"] - timeSeries[Object.keys(timeSeries)[1]]["4. close"]) /
//                           timeSeries[Object.keys(timeSeries)[1]]["4. close"]) *
//                         100
//                       ).toFixed(2)}
//                       %
//                     </p>
//                   </Col>
//                 </Row>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, Table } from "reactstrap";
import "../../assets/css/CustomCSS/StockHeader.css";
import Chart from "../../assets/img/Chart.png";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function StockPageHeader() {
  const [data, setData] = useState({});
  const [metaData, setMetaData] = useState({});
  
  const { company } = useParams();

  useEffect(() => {
    console.log(company);
    const apiKey = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
    console.log(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${company}&interval=5min&apikey=${apiKey}`)
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${company}&interval=5min&apikey=${apiKey}`)
      .then((response) => {
        console.log(`response.data = ${JSON.stringify(response.data)}`);
        const timeSeriesData = response.data["Time Series (5min)"];
        const metaData = response.data["Meta Data"];
        setMetaData(metaData);
        setData(timeSeriesData);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [company, data]);

  // const latestDate = data ? Object.keys(data)[0] : null;
  // data = latestDate ? data[latestDate] : {};

  return (
    <div className="stock-page-header">
      <Container>
        <Row className="justify-content-center">
          <Col md="8" className="text-center mb-4">
            <section className="Chart-Section">
              <img src={Chart} alt="Chart" />
            </section>
            <h1 className="display-4">{metaData["2. Symbol"]} - {data["4. close"]}</h1>
            <p className="lead">{metaData["1. Information"]}</p>
            <p>Last Refreshed: {metaData["3. Last Refreshed"]}</p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            <Card>
              <CardBody>
                <Row>
                  <Col>
                    <CardTitle tag="h5">Stock Overview</CardTitle>
                    <Table>
                      <tbody>
                        <tr>
                          <th scope="row">Open</th>
                          <td>{data["1. open"]}</td>
                        </tr>
                        <tr>
                          <th scope="row">High</th>
                          <td>{data["2. high"]}</td>
                        </tr>
                        <tr>
                          <th scope="row">Low</th>
                          <td>{data["3. low"]}</td>
                        </tr>
                        <tr>
                          <th scope="row">Close</th>
                          <td>{data["4. close"]}</td>
                        </tr>
                        <tr>
                          <th scope="row">Volume</th>
                          <td>{data["5. volume"]}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                  <Col>
                    <CardTitle tag="h5">Performance</CardTitle>
                    <p>Previous Close: N/A</p>
                    <p>Current Close: {data["4. close"]}</p>
                    <p>Change: N/A %</p>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
