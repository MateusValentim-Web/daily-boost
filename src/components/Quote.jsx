import React, { useState, useEffect } from "react";
import "./Quote.css";

function Quote() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    fetch("https://api.adviceslip.com/advice")
      .then((res) => res.json())
      .then((data) => setQuote(data.slip.advice))
      .catch(() =>
        setQuote("Você é capaz de tudo o que se propõe! 💪")
      );
  }, []);

  return (
    <section className="quote-container">
      <h2 className="quote-title">Frase do dia</h2>
      {quote && <blockquote className="quote-text">"{quote}"</blockquote>}
    </section>
  );
}

export default Quote;
