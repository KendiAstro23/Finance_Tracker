import React from 'react';

const AlertNotification = ({ message }) => {
  return (
    <div style={{ color: 'red' }}>
      {message}
    </div>
  );
};

export default AlertNotification;
