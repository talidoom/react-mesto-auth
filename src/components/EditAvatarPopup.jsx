import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditAvatarPopup = (props) => {
    const { isOpen, onClose, onUpdateAvatar } = props;
    const avatarRef = React.useRef();

    React.useEffect(() => {
        avatarRef.current.value = '';
      }, [isOpen]);
        
    
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm
            popup="edit-avatar"
            title="Обновить аватар?"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            submitButtonText="Сохранить"
            children={
              <>
                <input
                  ref={avatarRef}
                  type="url"
                  className="form__input form__input_type_avatar"
                  placeholder="ссылка на картинку"
                  name="avatar"
                  id="avatar"
                  required
                />
                <span className="form__input-error" id="avatar-error"></span>
              </>
            }
        />
    );
};

export default EditAvatarPopup;