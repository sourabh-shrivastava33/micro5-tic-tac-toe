import choosePlayerCss from "./ChoosePlayer.module.css";
import { sign } from "./sign";
const ChoosePlayer = ({ onClick }) => {
	return (
		<div className={choosePlayerCss.chooseComp}>
			<h3 className={choosePlayerCss.heading}>PICK PLAYER</h3>
			<div className={choosePlayerCss.buttonCont}>
				<button
					className={choosePlayerCss.crossButton}
					onClick={() => {
						onClick("cross");
					}}
				>
					{sign.cross}
				</button>
				<button
					className={choosePlayerCss.circleButton}
					onClick={() => {
						onClick("circle");
					}}
				>
					{sign.circle}
				</button>
			</div>
		</div>
	);
};

export default ChoosePlayer;
