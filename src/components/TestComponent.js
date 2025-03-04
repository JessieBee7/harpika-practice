import React from 'react';

const TestComponent = () => {
  return (
    <div style={{
      background: 'linear-gradient(to right, #ff0000, #00ff00, #0000ff)',
      padding: '20px',
      borderRadius: '8px',
      margin: '20px 0',
      textAlign: 'center'
    }}>
      <h2 style={{ color: 'white', fontSize: '24px' }}>
        TEST COMPONENT IS WORKING!
      </h2>
      <p style={{ color: 'white' }}>
        If you can see this, your deployment is working correctly.
      </p>
    </div>
  );
};

export default TestComponent;
