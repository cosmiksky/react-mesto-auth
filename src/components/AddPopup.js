import PopupWithForm from './PopupWithForm.js';
import React from 'react';

function AddPopup({isAddPlacePopupOpen, closeAllPopups, onAddPlace}) {

  const nameRef = React.useRef();
  const linkRef = React.useRef();

  React.useEffect(() => {
    nameRef.current.value = '';
    linkRef.current.value = '';
  }, [isAddPlacePopupOpen])

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
        name: nameRef.current.value,
        link: linkRef.current.value
    })
}

    return (
      <PopupWithForm isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} titleText={'Новое место'} buttonText={'Создать'} name={'add'} onSubmit={handleSubmit}>
              <input ref={nameRef} id="name-input" type="text" name="name" className="popup__input popup__input_type_title-name" placeholder="Название" minLength={2} maxLength={30} required />
              <span className="popup__error name-input-error" />
              <input ref={linkRef} id="link-input" type="url" name="link" className="popup__input popup__input_type_photo-link" placeholder="Ссылка на картинку" required />
              <span className="popup__error link-input-error" />
      </PopupWithForm>
    );
};

export default AddPopup;