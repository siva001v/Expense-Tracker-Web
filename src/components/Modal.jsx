import { IoMdClose } from "react-icons/io";

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
          <button
            className="modal__footer-btn-no"
            type="button"
            onClick={() => onClose()}
          >
            NO
          </button>
          <button
            className="modal__footer-btn-yes"
            type="button"
            onClick={() => onSuccess()}
          >
            YES
          </button>
        </div>
      </div>
    </div>
  );
}
