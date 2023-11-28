import React from 'react';
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser  = React.useContext(CurrentUserContext)
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `element__group ${isLiked && 'element__group_active'}` 
  );

    function handleClick() {
      onCardClick(card)
    }

    function handleLikeClick() {
      onCardLike(card)
    }

    function handleDeleteClick() {
      onCardDelete(card)
    }

    return (
        <div className="elements__list">
              <div className="element">
                <img className="element__mask-group" style={{ backgroundImage: `url(${card.link})` }} src={card.link} alt={card.name} onClick={handleClick} /> 
                {isOwn &&<button className="element__trash" type="button" onClick={handleDeleteClick}/>}
                <div className="element__container">
                  <h2 className="element__title">{card.name}</h2>
                  <div className="element__group-like">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />
                    <p className="element__like">{card.likes.length}</p>
                  </div>
                </div>
              </div>
            </div>
    )
}

export default Card;