import React from 'react';
import api from '../utils/Api.js';
import Card from '../components/Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext'

function Main ({cards, onAddPlace, onEditAvatar, onEditProfile, onCardClick, onCardLike, onCardDelete}) {
  // const [userName, setUserName] = React.useState([]);
  // const [userDescription, setUserDescription] = React.useState([]);
  // const [userAvatar, setUserAvatar] = React.useState([]);
  // const [cards, setCards] = React.useState([]);

  const currentUser = React.useContext(CurrentUserContext)

//   React.useEffect(() => {
//     api.getUserInfo()
//     .then((res) => {
//       setUserName(res.name);
//       setUserDescription(res.about);
//       setUserAvatar(res.avatar)
//     })
//     .catch(() => {
//        console.error('Ошибка получения данных')
//       })
// }, [])

  // React.useEffect(() => {
  //   api.getAllCards()
  //   .then((cards) => {
  //     setCards(cards)
  //   })
  //   .catch(() => {
  //     console.error('Ошибка загрузки карточек')
  //   })
  // }, [])

  return(
    <main className="content">
        <section className="profile">
            <div className="profile__column">
              <div className="profile__overlay" onClick={onEditAvatar}>
                <img className="profile__image" src={currentUser ? currentUser.avatar : ''} alt="Аватарка" />
              </div>
              <div className="profile__info">
                <h1 className="profile__title">{currentUser ? currentUser.name : ''}</h1>
                <button id="open-popup-editButton" onClick={onEditProfile} className="profile__edit-button" type="button" />
                <p className="profile__subtitle">{currentUser ? currentUser.about : ''}</p>
              </div>
            </div>
            <button id="open-popup-addButton" onClick={onAddPlace} type="button" className="profile__add-button" />
          </section>
          <div className="elements">
            {cards.map((card, id) => (
            <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
              )
            )}
        </div>
    </main>
    )
}
export default Main;