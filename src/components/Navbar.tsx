import React from 'react';

const navBarStyle = {
  color: 'white',
  height: '10vh',
  padding: '20px',
  background: 'black',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px',
};

function Navbar() {
  return <div style={navBarStyle}>My Fabulous Store</div>;
}

export default Navbar;
