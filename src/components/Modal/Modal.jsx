import { IoMdClose } from "react-icons/io";
import "./Modal.scss";
import Button from "../Button/Button";

export function Modal({ title, content, onClose, onSuccess }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__header">
          <span>{title}</span>
          <IoMdClose
            className="modal__header-close"
            onClick={() => onClose()}
          />
        </div>
        <div className="modal__content">
          <p>{content}</p>
        </div>
        <div className="modal__footer">
          <Button type="button" mode="fail" handleClick={() => onClose()}>
            NO
          </Button>
          <Button type="button" mode="success" handleClick={() => onSuccess()}>
            YES
          </Button>
        </div>
      </div>
    </div>
  );
}
