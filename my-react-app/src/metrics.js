import React from 'react';

function Metrics({ totalSpending, cumulativeSpending }) {
  return (
    <section className="metrics">
      <div className="metric">
        <h3>Total Spending</h3>
        <p>{`KES ${totalSpending}`}</p>
      </div>
      <div className="metric">
        <h3>Cumulative Spending</h3>
        <p>{`KES ${cumulativeSpending}`}</p>
      </div>
    </section>
  );
}

export default Metrics;
