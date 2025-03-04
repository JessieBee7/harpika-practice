import React from 'react';
import ReactDOM from 'react-dom';

const StandaloneTest = () => (
  <div style={{
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'red',
    color: 'white',
    padding: '30px',
    fontSize: '24px',
    zIndex: 9999,
    boxShadow: '0 0 20px black'
  }}>
    THIS IS A TEST OVERLAY
  </div>
);

// Render this directly to the document body
const div = document.createElement('div');
document.body.appendChild(div);
ReactDOM.render(<StandaloneTest />, div);
