function ImagePopup({card, onClose}) {
    return(
        <div id="photo-popup" className={`popup popup_dark ${card ? 'popup_is-open' : ''}`}>
          <figure className="popup__container">
            <button id="close-popup-button-img" type="button" className="popup__close-button" onClick={onClose} />
            <img className="popup__image" src={card?.link} alt={card?.name} />
            <h2 className="popup__caption">{card?.name}</h2>
          </figure>
        </div>
    )
}

export default ImagePopup;