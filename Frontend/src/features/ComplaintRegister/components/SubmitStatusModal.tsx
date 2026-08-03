import "../../../styles/statusSubmit.css";

interface SubmitStatusModalProps {
  status: 'success' | 'error';
  onClose: () => void;
}

function SubmitStatusModal({ status, onClose }: SubmitStatusModalProps) {
     
  return (
    <div className="status-modal__overlay" onClick={onClose}>
      <div
        className={`status-modal ${status === 'success' ? 'status-modal--success' : 'status-modal--error'}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <p className="status-modal__message">
          {status === 'success'
            ? 'Your complaint has been submitted successfully.'
            : 'Something went wrong. Please try again.'}
        </p>
        <button type="button" className="status-modal__close" onClick={() => {
    onClose();
    window.location.reload();
  }}>
          OK
        </button>
      </div>
    </div>
  );
}

export default SubmitStatusModal;