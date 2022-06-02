import React from 'react';

import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
// Импортируем объект контекста
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

import * as Auth from '../Auth.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isLoginAnswerPopupOpen, setIsLoginAnswerPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    name: "",
    link: ""
  });

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState(false);

  const history = useHistory();
  

  function tokenCheck () {
      
      const jwt = localStorage.getItem('jwt');
    if (jwt){
      // проверим токен
      Auth.getContent(jwt)
      .then((res) => {
        if (res){
                  // здесь можем получить данные пользователя!
          const userData = {            
            email: res.email
          }
                  // поместим их в стейт внутри App.js
          setLoggedIn({
            setLoggedIn: true,
            userData
          }, () => {
            //props????????
            history.push("/dashboard");
          });
        }
      }); 
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
        history.push("/ducks");
    }
  }, [loggedIn]);

// ???????????
//  function handleLogin() {    
//    setLoggedIn(true);
//    tokenCheck();
//  }
const handleLogin = ({ email, password }) => {
  return Auth.authorize(email, password)
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem('jwt', data.jwt);

          tokenCheck();
          history.push('/dashboard');
        }
      })
}


  function handleAddPlaceSubmit({name, link}) {
    api.addCard({name, link})
        .then((newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopups();
          
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
  }

  const handleCardDelete = (card) => {
    api.deleteConfirmCard(card._id)
      //, !isOwn)
      .then(() => {
        setCards(cards.filter(item => item._id !== card._id));
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
  }

  React.useEffect(() => {
    api.getInitialCards()
      .then((cards) => {        
        setCards(cards)      
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })    
  },
  []); 

React.useEffect(() => {
  api.getProfile()
    .then((data) => {      
      setCurrentUser(data)      
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })    
},
[]);
  
  // Открытие ImagePopup
  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true,
      name: card.name,
      link: card.link
    })
  } 

  // Закрытие попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsLoginAnswerPopupOpen(false);
    setSelectedCard({
      isOpen: false,
      name: "",
      link: ""
    })
  }

  // Закрытие на оверлей
  function closePopupOnOverley(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }  

  // Открытие попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }  

  function openInfoTooltip() {
    setIsLoginAnswerPopupOpen(true);
  }  

  function handleUpdateUser({name, about}) {
    api.editProfile({name, about})
    .then((data) => {      
      setCurrentUser(data) 
      closeAllPopups()     
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
  }

  function handleUpdateAvatar({avatar}) {
    api.updateAvatar({avatar})
    .then((data) => {      
      setCurrentUser(data) 
      closeAllPopups()     
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
  }

  return (
  <div className="root common">
    <div className="page">
        
      <CurrentUserContext.Provider value={currentUser}>

      <Switch>
          <ProtectedRoute
            path="/dashboard"
            loggedIn={handleLogin}
            component={Main}
            userData={setLoggedIn.userData}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />         
          <Route path="/sign-up"> {/*для регистрации*/}  
            <Register />      
          </Route>
          <Route path="/sign-in">  {/*для авторизации*/}
            <Login
              handleLogin={handleLogin} />      
          </Route>
          <Route exact path="/">
            {!loggedIn ? <Redirect to="/sign-in" /> : <Redirect to="/dashboard" />}
          </Route>
        </Switch>  

       {/* <Header />        

        <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
  onCardDelete={handleCardDelete} />*/}

        <InfoTooltip
                isOpen={isLoginAnswerPopupOpen}
                onClose={closeAllPopups}
                onCloseOverlay={closePopupOnOverley}
                onInfoTooltip={openInfoTooltip}   />      

        <EditProfilePopup
         isOpen={isEditProfilePopupOpen}
         onClose={closeAllPopups}
         onCloseOverlay={closePopupOnOverley}
         onUpdateUser={handleUpdateUser} />  

        <AddPlacePopup
         isOpen={isAddPlacePopupOpen}
         onClose={closeAllPopups}
         onCloseOverlay={closePopupOnOverley}
         onAddPlace={handleAddPlaceSubmit} />              

        <PopupWithForm
          name="delete-confirm"
          title="Вы уверены?"
          buttonTitle="Да"
          />

        <EditAvatarPopup
         isOpen={isEditAvatarPopupOpen}
         onClose={closeAllPopups}
         onCloseOverlay={closePopupOnOverley}
         onUpdateAvatar={handleUpdateAvatar} />            

        <ImagePopup    
          card={selectedCard}
          onClose={closeAllPopups}
          onCloseOverlay={closePopupOnOverley}
        />    

        {/*<Footer /> */}
      </CurrentUserContext.Provider>
    </div>
  </div>
  );
}

export default App;
