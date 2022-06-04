import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../images/logo.svg';

function Header(props) {

  let { email } = props.userData || {};  

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип"/>
      <nav className="header__login-container">
        <div className="header__login-mail">{email}</div>
        <Link to="/sign-in" className="header__login-registration">Войти</Link>
      </nav>
    </header>    
  );
}

export default Header;