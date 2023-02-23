import React, { useState, useEffect } from "react";
import axios from "axios"; //importa a biblioteca Axios, que será usada para fazer chamadas de API.
import moment from "moment";
import "./App.css";

function App() {
  const [news, setNews] = useState([]);

  // O hook useEffect é usado para fazer a chamada de API assim que o componente é montado
  useEffect(() => {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=br&apiKey=3cf1b82302fe4804842655b32d2c8bf5"
      )
      .then((response) => {
        console.log(response.data);
        setNews(response.data.articles); // atualiza o estado de news com os artigos recebidos
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Últimas Notícias do Brasil</h1>
      </header>
      <main>
        {news.map(
          (
            article,
            index //itera sobre o array de artigos de notícias e cria um elemento para cada um usando a função map.
          ) => (
            <div key={index} className="article">
              <a href={article.url} target="_blank" rel="noreferrer">
                <img src={article.urlToImage} alt={article.title} />
              </a>
              <div className="article-text">
                <h2>
                  <a href={article.url} target="_blank" rel="noreferrer">
                    {article.title}
                  </a>
                </h2>
                <p>{article.description}</p>
                <p className="date">
                  {moment(article.publishedAt).format("DD/MM/YYYY")}
                </p>
                <p>{article.author}</p>
              </div>
            </div>
          )
        )}
      </main>
    </div>
  );
}

export default App;
