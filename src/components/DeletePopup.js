import PopupWithForm from './PopupWithForm.js';

function DeletePopup({isDeletePopupOpen}) {
    return (
      <PopupWithForm isOpen={isDeletePopupOpen}>
            <h2 className="popup__title popup__title_delete">Вы уверены?</h2>
            <button type="submit" id="agree-delete" className="popup__save-button popup__save-button_delete">Да</button>
      </PopupWithForm>
    );
};

export default DeletePopup;