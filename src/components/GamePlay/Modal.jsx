import { createPortal } from "react-dom";
import modalCss from "./Modal.module.css";
import { useOutSideClick } from "../../hooks/useOutsideClick";
const Modal = ({ children, setShowModal }) => {
	const { ref, handleOutsideClick } = useOutSideClick(() => {
		setShowModal?.(false);
	});
	return createPortal(
		<div className={modalCss.overlay} onClick={handleOutsideClick}>
			<div className={modalCss.modal} ref={ref}>
				{children}
			</div>
		</div>,
		document.querySelector("._play_10viz_1")
	);
};

export default Modal;
