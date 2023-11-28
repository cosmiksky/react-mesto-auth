import PopupWithForm from './PopupWithForm.js';
import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext'

function EditProfilePopup({isOpen, closeAllPopups, onUpdateUser}) {

  const [name,setName] = React.useState('')
  const [description,setDescription] = React.useState('')
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
  //  console.log(currentUser)
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

  function handleSubmit(e) {
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

    return (
      <PopupWithForm isOpen={isOpen} onClose={closeAllPopups} onSubmit={handleSubmit} titleText={'Редактировать'} buttonText={'Сохранить'} name={'edit'}>
                <input value={name || ''} type="text" name="name" className="popup__input popup__input_type_nickname" minLength={2} maxLength={40} required onChange={handleChangeName} />
                <span className="popup__error title-input-error" />
                <input value={description || ''} type="text" name="about" className="popup__input popup__input_type_job" minLength={2} maxLength={200} required onChange={handleChangeDescription} />
                <span className="popup__error field-input-error" />
      </PopupWithForm>
    );
};

export default EditProfilePopup;