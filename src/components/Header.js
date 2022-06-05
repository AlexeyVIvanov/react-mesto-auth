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
        {/*<Link to="/sign-in" className="header__login-registration">Войти</Link>*/}
        <Link to={props.click} className="header__login-registration">{props.text}</Link>
        {/*<button type='button' className="header__login-registration" onClick={props.click}>{props.text}</button>*/}
      </nav>
    </header>    
  );
}

export default Header;