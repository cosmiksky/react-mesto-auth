import PopupWithForm from './PopupWithForm.js';
import React from 'react';

function AvatarPopup({isOpen, closeAllPopups, onUpdateAvatar}) {

  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = ''
  }, [isOpen]); 

    return (
      <PopupWithForm isOpen={isOpen} onClose={closeAllPopups} titleText={'Обновить аватар'} buttonText={'Создать'} name={'avatar'} onSubmit={handleSubmit}>
              <input id="avatar-input" type="url" name="avatar" className="popup__input popup__input_type_avatar" minLength={2} placeholder="Ссылка на аватар" ref={avatarRef} required />
              <span className="popup__error avatar-input-error" />
      </PopupWithForm>
    );
};

export default AvatarPopup;