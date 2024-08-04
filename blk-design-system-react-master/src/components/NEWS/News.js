import React, { useEffect, useState } from "react";
import NewsBG from "../../assets/img/NewsBG.avif";
import { Button } from "reactstrap";
import "../../assets/css/CustomCSS/News.css";
import axios from "axios";
import { Link } from "react-router-dom";

const News = () => {
  const apiKey = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
  const [expanded, setExpanded] = useState(null);
  const [newsItems, setNewsItems] = useState([]);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  useEffect(() => {
    axios.get(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=${apiKey}`)
    .then(response => {
      console.log(`newsResponse data: -----  ${JSON.stringify(response.data)}`);
      const data = response.data["feed"];
      setNewsItems(data.slice(0, 3));
    })
    .catch(err => {
      console.log(err);
    })
  }, [])


  return (
    <>
      <div className="bg-image">
        <img src={NewsBG} alt="News-Background" />
      </div>

      <div className="news-container">
        <div className="news-list">
          {newsItems.map((item, index) => (
            <div key={index} className="news-item">
              <div className="title">
                <h1>{item.title}</h1>
                <Button
                  className="btn-round"
                  color="primary"
                  onClick={() => toggleExpand(index)}
                >
                  {expanded === index ? "Collapse" : "Read"}
                </Button>
              </div>
              {expanded === index && (
                <div className="news-content">
                  <p>{item.summary}</p>
                  <Link to={item.url}>{item.url}</Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default News;
