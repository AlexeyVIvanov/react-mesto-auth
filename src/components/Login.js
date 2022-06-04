import React from 'react';

import { useHistory } from 'react-router-dom';

import Header from './Header';
import * as Auth from '../utils/Auth';

function Login(props) {  

  //const [email, setEmail] = React.useState('');
  //const [password, setPassword] = React.useState('');
  const [formParams, setFormParams] = React.useState({email: '', password: ''});
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
        
  //  evt.preventDefault();  
  //  if (
      //!setEmail ||
  //     !setPassword){
  //    return;
  //  }  
  //  Auth.authorize(
      //setEmail, 
  //    setPassword)
  //.then((data) => {
  //  if (data.jwt){
  //    setPassword({email: '',
  //      password: ''}
  //       ,() => {
  //        props.handleLogin();
  //        history.push('/dashboard');
  //    })
  //  }  
  //})
  //.catch(err => console.log(err)); // запускается, если пользователь не найден
//}

const handleSubmit = (e) => {
  e.preventDefault();
  if (!formParams.email || !formParams.password){
    return;
  }
  props.handleLogin({ email: formParams.email, password: formParams.password })
  
      {/*.catch(err => {
        setMessage(err.message);
      });*/}
}
          

    return(
        <>
        <Header />
        <section className="popup popup_opened popup_type_register">
          <div className="popup__container popup__container_theme_dark">            
            <form onSubmit={handleSubmit} name="login" className="popup__form popup__form-edit-profile" >
              <h2 className="popup__title popup__title_theme_dark">Вход</h2>
              <fieldset className="popup__input-container popup__input-container_theme_dark">
                <input value={formParams.email || ''} onChange={handleChange} className="popup__input popup__input_theme_dark" id="popup__input-email" type="email" name="email"  minLength="2" maxLength="30" placeholder="Email" required/>
                <span className="popup__input-error popup__input-place-error" ></span>
                <input value={formParams.password || ''} onChange={handleChange} className="popup__input popup__input_theme_dark" id="popup__input-password" type="password" name="password"  placeholder="Пароль" required/>
                <span className="popup__input-error popup__input-link-error" ></span>
              </fieldset>
              <button type="submit" className="popup__submit popup__submit-edit-profile popup__submit_theme_dark">Войти</button>
              
            </form>
          </div>
        </section>
        </>
    )
  
}

export default Login;