import React from 'react'
import { Link } from 'react-router-dom';
import "./styles.css"

function Header() {
  return (
    <header>
        <Link className='logo' to={"/"}>Filmix</Link>
        <Link className='favoritos' to={"/favoritos"}>Meus filmes</Link>
    </header>
  )
}

export default Header;