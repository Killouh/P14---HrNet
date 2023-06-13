import PropTypes from 'prop-types';
import './modal.css';

// voir quand le formulaire sera ok (voir si close avec submit)
// voir attribut/template de taille 
// voir proposition avec modal header/title, footer
// Voir les différents usages de modale 

const Modal = ({ isOpen, onClose, children }) => {
    const closeModal = () => {
      onClose();
    };
  
    if (!isOpen) {
      return null; // Si la modal n'est pas ouverte, ne rien rendre
    }
  
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          {children}
        </div>
      </div>
    );
  };
  
  Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };
  
  export default Modal;