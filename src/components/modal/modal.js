import PropTypes from "prop-types";
import "./modal.css";

// voir quand le formulaire sera ok (voir si close avec submit)
// voir attribut/template de taille
// voir proposition avec modal header/title, footer
// Voir les différents usages de modale
// voir pour ajouter classe dans la modale

// Mettre un svg dans la modale / dans le paquet NPM

const Modal = ({ isOpen, onClose, children, modalClassName, contentClassName, closeClassName}) => {
  const closeModal = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  const modalClassNameConst = modalClassName;
  const contentClassNameConst = contentClassName;
  const closeClassNameeConst = closeClassName;

  return (
    <div className={modalClassNameConst}>
      <div className={contentClassNameConst}>
        <span className={closeClassNameeConst} onClick={closeModal}> X </span>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  modalClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  closeClassName: PropTypes.string,
};

export default Modal;
