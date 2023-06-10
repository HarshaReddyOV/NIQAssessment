import styled from "@emotion/styled";
import React from "react";

const NavBarStyle = styled.div({
  color: "white",
  height: "10vh",
  padding: "20px",
  background: "black",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
});

function Navbar() {
  return <NavBarStyle>My Fabulous Store</NavBarStyle>;
}

export default Navbar;
