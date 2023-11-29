import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditPopup.js';
import AddPopup from './AddPopup.js';
import AvatarPopup from './AvatarPopup.js';
import ImagePopup from './ImagePopup.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import api from '../utils/Api.js';
import ProtectedRoute from './ProtectedRoute';
import success from '../images/InfoTooltip_success.svg';
import error from '../images/InfoTooltip_fail.svg';
import auth from '../utils/Auth.js';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip.js';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)

  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

  const navigate = useNavigate();
  const [isTooltipErrorPopup, setIsTooltipErrorPopup] = React.useState(false);
  const [isTooltipSuccessPopup, setIsTooltipSuccessPopup] = React.useState(false);

  React.useEffect(() => {
    if (loggedIn) {
    api.getUserInfo()
    .then((userInfo) => {
      setCurrentUser(userInfo)
    })
    .catch(() => {
      console.error('ошибка получения данных')
    })
  }}, [loggedIn])

  React.useEffect(() => {
    if (loggedIn) {
    api.getAllCards()
    .then((cards) => {
      setCards(cards)
    })
    .catch(() => {
      console.error('Ошибка загрузки карточек')
    })
  }}, [loggedIn])

  const handleSignUp = (email, password) => {
    auth.registerUser(email, password)
    .then((res) => {
      setIsTooltipSuccessPopup(true)
      setTimeout(() => {
        navigate('/sign-in', {replace: true})
      }, 2000)
    })
    .catch(() => {
      console.error('Что-то пошло не так! Попробуйте еще раз')
      setIsTooltipErrorPopup(true);
    })
  }

  const handleSignIn = ({email, password}) => {
    auth.authUser(email, password)
    .then((res) => {
      if(res.token) {
        localStorage.setItem("token", res.token);
        setUserEmail(email);
        setLoggedIn(true);
        setIsTooltipSuccessPopup(true)
        navigate("/", {replace: true})
        return res
      }
    })
    .catch(() => {
      console.error('Что-то пошло не так! Попробуйте еще раз')
      setIsTooltipErrorPopup(true);
    })
  }


  const handleCheckToken = (jwt) => {
    console.log(jwt)
      auth.checkToken(jwt)
      .then((res) => {
        if(res) {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          navigate('/', {replace: true})
        }
      })
      .catch(() => {
        console.error(`Ошибка авторизации`);
      })
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      handleCheckToken(jwt);
    }
  }, [])


  function handleUpdateUser({name, about}) {
    api.pathUserInfo(name, about)
    .then((updatedUser) => {
      setCurrentUser(updatedUser);
      closeAllPopups();
   })
    .catch(() => {
      console.error('ошибка обновления данных')
    })
  }

  function handleUpdateAvatar(newAvatar) {
    api.changeAvatar(newAvatar.avatar)
    .then((user) => {
        setCurrentUser({...currentUser, avatar: user.avatar});
        closeAllPopups();
    })
    .catch(() => {
      console.error('ошибка обновления данных')
      });
  }

  function handleAddPlaceSubmit({name, link}) {
    api.createCard(name, link)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(() => {
      console.error('ошибка обновления данных')
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(() => {
      console.error('ошибка')
    })
}

  function handleDeleteCard(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((cards) => cards.filter((c) => c._id !== card._id));
    })
    .catch(() => {
      console.error('error')
    })
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }
  
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
    setIsTooltipErrorPopup(false);
    setIsTooltipSuccessPopup(false)
  }

  function handleLogout() {
    setLoggedIn(false)
    localStorage.removeItem('token')
    navigate('/sign-in', {replace: true})
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  return (
   <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header email={userEmail} onLogout={handleLogout} />
      <Routes>
        <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />} />
        <Route path="/" element={<ProtectedRoute  element={<Main cards={cards}
                                                                 onEditProfile = {handleEditProfileClick} 
                                                                 onAddPlace = {handleAddPlaceClick} 
                                                                 onEditAvatar = {handleEditAvatarClick} 
                                                                 onCardClick = {handleCardClick} 
                                                                 onCardLike = {handleCardLike}
                                                                 onCardDelete = {handleDeleteCard} />} 
                                                  loggedIn={loggedIn} />}/>
        <Route path="/sign-up" element={<Register onRegister={handleSignUp}/>}/>
        <Route path="/sign-in" element={<Login onLogin={handleSignIn} 
                                               title='Вход' 
                                               buttonText='Войти' />}/>
      </Routes>
      {loggedIn && <Footer />}
      <EditProfilePopup isOpen = {isEditProfilePopupOpen} closeAllPopups = {closeAllPopups} onUpdateUser={handleUpdateUser} />
      <AddPopup isAddPlacePopupOpen = {isAddPlacePopupOpen} closeAllPopups = {closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
      <AvatarPopup isOpen = {isEditAvatarPopupOpen} closeAllPopups = {closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <InfoTooltip isOpen={isTooltipSuccessPopup} onClose={closeAllPopups} title={'Вы успешно зарегистрировались!'} image={success} />
      <InfoTooltip isOpen={isTooltipErrorPopup} onClose={closeAllPopups} title={'Что-то пошло не так! Попробуйте ещё раз.'} image={error} />
    </div>
   </CurrentUserContext.Provider>
  );
}

export default App;
