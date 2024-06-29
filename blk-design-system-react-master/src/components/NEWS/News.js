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
      console.log(JSON.stringify(response.data));
      const data = response.data["feed"];
      setNewsItems(data.slice(0, 3));
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

  // const newsItems = [
  //   {
  //     title: "News Heading 1",
  //     content:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  //   },
  //   {
  //     title: "News Heading 2",
  //     content:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  //   },
  //   {
  //     title: "News Heading 3",
  //     content:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  //   },
  // ];

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
