import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Balance = () => {
  const [balance, setBalance] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBalance = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/balance');
      setBalance(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const totalBalanceUSD = balance.reduce((acc, curr) => acc + parseFloat(curr.usdValue || 0), 0).toFixed(2);

  return (
    <div>
      <h1>Account Balance</h1>
      <div>
        <h3>Total Balance: ${totalBalanceUSD}</h3>
      </div>
      <div>
        {balance.map((currency, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <h4>{currency.coin}</h4>
            <p>Available Balance: {parseFloat(currency.availableToWithdraw || 0).toFixed(4)}</p>
            <p>USD Value: ${parseFloat(currency.usdValue || 0).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Balance;
