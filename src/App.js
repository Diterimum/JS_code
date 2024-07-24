import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'https://api.coingecko.com/api/v3/coins/markets';
const PARAMS = {
  vs_currency: 'usd',
  order: 'market_cap_desc',
  per_page: 5,
  page: 1,
  sparkline: false,
};

const App=()=>{
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCryptos = async () => {
    try {
      const response = await axios.get(API_URL, { params: PARAMS });
      setCryptos(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptos();
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    await fetchCryptos();
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Cryptocurrency Prices</h1>
      <div className="crypto-list">
        {cryptos.map((crypto) => (
          <div key={crypto.id} className="crypto-item">
            <img src={crypto.image} alt={crypto.name} className="crypto-image" />
            <div>
              <h2>{crypto.name} ({crypto.symbol.toUpperCase()})</h2>
              <p>Current Price: ${crypto.current_price.toFixed(2)}</p>
              <p>Market Cap: ${crypto.market_cap.toLocaleString()}</p>
              <p>Price Change (24h): ${crypto.price_change_24h.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleRefresh} disabled={loading}>
        {loading ? 'Refreshing...' : 'Refresh Prices'}
      </button>
    </div>
  );
};

export default App;