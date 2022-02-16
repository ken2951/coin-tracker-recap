import { useState, useEffect } from "react";

function App() {
  const [amount, setAmount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  console.log(coins);
  const onClick = () => setAmount(1);
  const onChange = (event) => {
    setAmount(event.target.value);
  };
  return (
    <div>
      <h1>Cryptocurrency Converter Calculator</h1>
      <div>
        <input type="number" min="0" value={amount} onChange={onChange} />
        <button onClick={onClick}>Reset</button>
      </div>
      <div>
        {loading ? (
          <strong>Loading...</strong>
        ) : (
          <select>
            {coins.map((coin) => (
              <option key={coin.id}>
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
      <div>{loading ? null : <div>1 Bitcoin (BTC) = 44,298.30 USD</div>}</div>
    </div>
  );
}

export default App;
