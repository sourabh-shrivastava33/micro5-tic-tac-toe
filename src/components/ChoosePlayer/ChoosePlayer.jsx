import choosePlayerCss from "./ChoosePlayer.module.css";
import { sign } from "./sign";
const ChoosePlayer = ({ onClick, yourChoice }) => {
  const active = yourChoice;
  console.log(active);
  return (
    <div className={choosePlayerCss.chooseComp}>
      <h3 className={choosePlayerCss.heading}>PICK PLAYER</h3>
      <div className={choosePlayerCss.buttonCont}>
        <button
          className={`${choosePlayerCss.crossButton} ${
            active === "cross" ? choosePlayerCss.active : ""
          }`}
          onClick={() => {
            onClick("cross");
          }}
        >
          {sign.cross}
        </button>
        <button
          className={`${choosePlayerCss.circleButton} ${
            active === "circle" ? choosePlayerCss.active : ""
          }`}
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
