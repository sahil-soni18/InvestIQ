// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Card, CardBody, CardTitle, Table } from "reactstrap";
// import "../../assets/css/CustomCSS/StockHeader.css";
// import Chart from "../../assets/img/Chart.png";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// // In-memory cache
// let cache = {};
// const cacheTimeout = 5 * 60 * 1000; // Cache timeout of 5 minutes

// export default function StockPageHeader() {
//   const [data, setData] = useState({});
//   const [metaData, setMetaData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const { company } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       const now = new Date().getTime();

//       // Check if data is in cache and still valid
//       if (cache[company] && now - cache[company].timestamp < cacheTimeout) {
//         const cachedData = cache[company];
//         setMetaData(cachedData.metaData);
//         setData(cachedData.timeSeriesData);
//         setLoading(false);
//         return;
//       }

//       setLoading(true);
//       setError(null);

//       try {
//         const apiKey = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
//         const response = await axios.get(
//           `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${company}&interval=5min&apikey=${apiKey}`
//         );

//         const timeSeriesData = response.data["Time Series (5min)"];
//         const metaData = response.data["Meta Data"];

//         console.log(`Response: ${JSON.stringify(response.data)}`);

//         if (!(timeSeriesData && metaData)) {
//           throw new Error(response.data.Note || response.data.Information || "Failed to fetch data");
//         }

//         cache[company] = {
//           timeSeriesData,
//           metaData,
//           timestamp: now,
//         };

//         setMetaData(metaData);
//         setData(timeSeriesData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [company]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   const latestDate = data ? Object.keys(data)[0] : null;
//   const latestData = latestDate ? data[latestDate] : {};

//   return (
//     <div className="stock-page-header">
//       <Container>
//         <Row className="justify-content-center">
//           <Col md="8" className="text-center mb-4">
//             <section className="Chart-Section">
//               <img src={Chart} alt="Chart" />
//             </section>
//             <h1 className="display-4">{metaData["2. Symbol"]} - {latestData["4. close"]}</h1>
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
//                           <td>{latestData["1. open"]}</td>
//                         </tr>
//                         <tr>
//                           <th scope="row">High</th>
//                           <td>{latestData["2. high"]}</td>
//                         </tr>
//                         <tr>
//                           <th scope="row">Low</th>
//                           <td>{latestData["3. low"]}</td>
//                         </tr>
//                         <tr>
//                           <th scope="row">Close</th>
//                           <td>{latestData["4. close"]}</td>
//                         </tr>
//                         <tr>
//                           <th scope="row">Volume</th>
//                           <td>{latestData["5. volume"]}</td>
//                         </tr>
//                       </tbody>
//                     </Table>
//                   </Col>
//                   <Col>
//                     <CardTitle tag="h5">Performance</CardTitle>
//                     {Object.keys(data).length > 1 && (
//                       <>
//                         <p>Previous Close: {data[Object.keys(data)[1]]["4. close"]}</p>
//                         <p>Current Close: {latestData["4. close"]}</p>
//                         <p>
//                           Change:{" "}
//                           {(
//                             ((latestData["4. close"] - data[Object.keys(data)[1]]["4. close"]) /
//                               data[Object.keys(data)[1]]["4. close"]) *
//                             100
//                           ).toFixed(2)}
//                           %
//                         </p>
//                       </>
//                     )}
//                     {Object.keys(data).length <= 1 && (
//                       <p>Not enough data to calculate performance</p>
//                     )}
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



import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, Table } from "reactstrap";
import "../../assets/css/CustomCSS/StockHeader.css";
import Chart from "../../assets/img/Chart.png";
import { useParams } from "react-router-dom";
import { loginContext } from "../../context/ContextAPI";
import Button  from "../Button/Button"



// Dummy data for testing
const dummyMetaData = {
  "1. Information": "Intraday (5min) prices and volumes",
  "2. Symbol": "TCS",
  "3. Last Refreshed": "2024-07-21 16:00:00",
  "4. Interval": "5min",
  "5. Output Size": "Compact",
  "6. Time Zone": "US/Eastern"
};

const dummyTimeSeriesData = {
  "2024-07-21 16:00:00": {
    "1. open": "3200.00",
    "2. high": "3220.00",
    "3. low": "3190.00",
    "4. close": "3210.00",
    "5. volume": "1500"
  },
  "2024-07-21 15:55:00": {
    "1. open": "3195.00",
    "2. high": "3215.00",
    "3. low": "3185.00",
    "4. close": "3200.00",
    "5. volume": "1200"
  }
};

export default function StockPageHeader() {
  const loginState = useContext(loginContext);
  const [data, setData] = useState({});
  const [metaData, setMetaData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);




  const { company } = useParams();

  useEffect(() => {
    // Simulate API call with dummy data
    setTimeout(() => {
      setMetaData(dummyMetaData);
      setData(dummyTimeSeriesData);
      setLoading(false);
    }, 1000);
  }, [company]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const latestDate = data ? Object.keys(data)[0] : null;
  const latestData = latestDate ? data[latestDate] : {};

  return (
    <div className="stock-page-header">
      <Container>
        <Row className="justify-content-center">
          <Col md="8" className="text-center mb-4">
            <section className="Chart-Section">
              <img src={Chart} alt="Chart" />
            </section>
            <h1 className="display-4">{metaData["2. Symbol"]} - {latestData["4. close"]}</h1>
            <p className="lead">{metaData["1. Information"]}</p>
            <p>Last Refreshed: {metaData["3. Last Refreshed"]}</p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            <Card>
              <CardBody>
                {loginState.isLoggedIn? <Button company={company}/> : ""}
                <Row>
                  
                  <Col>
                    <CardTitle tag="h5">Stock Overview</CardTitle>
                    <Table>
                      <tbody>
                        <tr>
                          <th scope="row">Open</th>
                          <td>{latestData["1. open"]}</td>
                        </tr>
                        <tr>
                          <th scope="row">High</th>
                          <td>{latestData["2. high"]}</td>
                        </tr>
                        <tr>
                          <th scope="row">Low</th>
                          <td>{latestData["3. low"]}</td>
                        </tr>
                        <tr>
                          <th scope="row">Close</th>
                          <td>{latestData["4. close"]}</td>
                        </tr>
                        <tr>
                          <th scope="row">Volume</th>
                          <td>{latestData["5. volume"]}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                  <Col>
                    <CardTitle tag="h5">Performance</CardTitle>
                    {Object.keys(data).length > 1 && (
                      <>
                        <p>Previous Close: {data[Object.keys(data)[1]]["4. close"]}</p>
                        <p>Current Close: {latestData["4. close"]}</p>
                        <p>
                          Change:{" "}
                          {(
                            ((latestData["4. close"] - data[Object.keys(data)[1]]["4. close"]) /
                              data[Object.keys(data)[1]]["4. close"]) *
                            100
                          ).toFixed(2)}
                          %
                        </p>
                      </>
                    )}
                    {Object.keys(data).length <= 1 && (
                      <p>Not enough data to calculate performance</p>
                    )}
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
