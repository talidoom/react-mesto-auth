import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = (props) => {
    const { isOpen, onClose } = props;
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState(currentUser.name);
    const [description, setDescription] = React.useState(currentUser.about);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }
    

    return (
        <PopupWithForm
            popup="profile"
            title="Редактировать проофиль"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            submitButtonText="Сохранить"
            children={
        <>
          <input
            value={name || ''}
            onChange={handleChangeName}
            type="text"
            className="form__input form__input_type_name"
            id="name"
            placeholder="Введите Ваше имя"
            name="name"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="form__input-error" id="name-error"></span>
          <input
            value={description || ''}
            onChange={handleChangeDescription}
            type="text"
            className="form__input form__input_type_about"
            placeholder="Ваша профессия"
            id="about" 
            name="about"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="form__input-error" id="about-error"></span>
        </>
      }
    />
    );
};

export default EditProfilePopup;