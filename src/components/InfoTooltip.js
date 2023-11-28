function InfoTooltip({ isOpen, onClose, title, image }) {
    const popupOpen = isOpen ? 'popup_is-open' : '';
  return (
    <div className={`popup ${popupOpen}`}>
      <div className="popup__content">
        <button className="popup__close-button" type="button" onClick={onClose} />
        <img className="popup__tooltip-image" src={image} alt='' />
        <h2 className="popup__tooltip-title">{title}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;