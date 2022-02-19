import { useState, useEffect } from "react";

function App() {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [price, setPrice] = useState(0);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  // console.log(coins);
  const onClick = () => setAmount(0);
  const onInput = (event) => {
    setAmount(event.target.value);
    setPrice((current) => current * event.target.value);
  };
  const onSelected = (event) => {
    setPrice(event.target.value);
    // console.log(event.target.innerText);
  };
  return (
    <div>
      <h1>Cryptocurrency Converter Calculator</h1>
      <div>
        <input type="number" min="0" value={amount} onChange={onInput} />
        <button onClick={onClick}>Reset</button>
      </div>
      <div>
        {loading ? (
          <strong>Loading...</strong>
        ) : (
          <select onChange={onSelected}>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.quotes.USD.price}>
                {coin.name} ({coin.symbol})
              </option>
            ))}
          </select>
        )}
      </div>
      <div>
        {loading ? null : (
          <select>
            <option>USD</option>
          </select>
        )}
      </div>
      <div>
        {loading ? null : (
          <div>
            {amount} Bitcoin (BTC) = {price} USD
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
