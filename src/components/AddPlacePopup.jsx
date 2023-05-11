import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace } = props;
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      popup="place"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText="Создать"
    >
      <>
        <input
          value={name}
          onChange={handleNameChange}
          type="text"
          className="form__input form__input_type_placename"
          placeholder="Название"
          id="title"
          name="name"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="form__input-error" id="title-error"></span>
        <input
          value={link}
          onChange={handleLinkChange}
          type="url"
          className="form__input form__input_type_link"
          placeholder="Ссылка на картинку"
          id="link"
          name="link"
          required
        />
        <span className="form__input-error" id="avatar-error"></span>
      </>
    </PopupWithForm>
  );
}

export default AddPlacePopup;