import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import Header from './Header';
import * as Auth from '../utils/Auth';
import InfoTooltip from './InfoTooltip';

import success from '../images/success-icon.svg';
import fail from '../images/fail-icon.svg';



function Register(props) { 

  //const [email, setEmail] = React.useState('');
  //const [password, setPassword] = React.useState('');
  const [formParams, setFormParams] = React.useState({email: '', pasword: ''});
  const [message, setMessage] = React.useState('');
  const history = useHistory();

  //function handleChangeEmail(evt) {
  //  setEmail(evt.target.value);
  //}

  //function handleChangePassword(evt) {
  //  setPassword(evt.target.value);
  //}
  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  //function handleSubmit(evt) {    
   // evt.preventDefault();  
    
  //  Auth.register(email, password)
  //  .then((res) => {
   //   if(res){ 
   //     return (               
   //       <InfoTooltip           
  //         image={success}
  //         title="Вы успешно зарегистрировались!"
  //         /> , () => {
  //        history.push('/sign-in');
  //      })
  //    } else {   
  //      return (    
  //        <InfoTooltip
  //        image={fail}
  //        title="Что-то пошло не так!
  //        Попробуйте ещё раз."
  //         />        
  //         )}
  //  });
  //}
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (formParams.email || formParams.password) {
      let { email, password } = formParams;
      props.handleRegister({ email, password })
      {/*.catch(err => {
        setMessage(err.message);
      });*/}
    }
  }  

    return(
        <>
        <Header />
        <section className="popup popup_opened popup_type_register">
          <div className="popup__container popup__container_theme_dark">            
            <form onSubmit={handleSubmit} name="register" className="popup__form popup__form-edit-profile" >
              <h2 className="popup__title popup__title_theme_dark">Регистрация</h2>
              <fieldset className="popup__input-container popup__input-container_theme_dark">
                <input value={formParams.email || ''} onChange={handleChange} className="popup__input popup__input_theme_dark" id="popup__input-email" type="email" name="email"  minLength="2" maxLength="30" placeholder="Email" required/>
                <span className="popup__input-error popup__input-place-error" ></span>
                <input value={formParams.password || ''} onChange={handleChange} className="popup__input popup__input_theme_dark" id="popup__input-password" type="password" name="password"  placeholder="Пароль" required/>
                <span className="popup__input-error popup__input-link-error" ></span>
              </fieldset>
              <button type="submit" className="popup__submit popup__submit-edit-profile popup__submit_theme_dark">Зарегистрироваться</button>
              <div className="popup__signin">
                <p className="popup__signin-text">Уже зарегистрированы?</p>
                <Link to="/sign-in" className="popup__login-link">Войти</Link>
              </div>
            </form>
          </div>
        </section>
        </>
    )
  
}

export default Register;