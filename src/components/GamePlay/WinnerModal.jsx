import { sign } from "../ChoosePlayer/sign";
import WinnerCss from "./WinnerModal.module.css";
const WinnerModal = ({
  winner,
  yourChoice,
  setGameArr,
  setWinner,
  setYourChoice,
  setPlayGame,
  setCurrentTurn,
}) => {
  return (
    <div className={WinnerCss.win}>
      <p className={WinnerCss.declaration}>
        {winner === "tie"
          ? "its tie"
          : winner === yourChoice
          ? "You Won!"
          : "PC Won!"}
      </p>
      <h2 className={WinnerCss[winner]}>
        {winner === "tie" ? (
          "No one won"
        ) : (
          <>
            {sign[winner]} <span>takes the round</span>
          </>
        )}
      </h2>
      <span className={WinnerCss.buttons}>
        <button
          onClick={() => {
            setGameArr(Array(9).fill(null));
            setWinner(null);
            setPlayGame(false);
            setYourChoice(null);
            sessionStorage.removeItem("play");
            sessionStorage.removeItem("choice");
            sessionStorage.removeItem("score");
          }}
          className={WinnerCss.quit}
        >
          quit
        </button>
        <button
          onClick={() => {
            setGameArr(Array(9).fill(null));
            setWinner(null);
            setCurrentTurn(yourChoice);
          }}
          className={WinnerCss.playAgain}
        >
          play again
        </button>
      </span>
    </div>
  );
};

export default WinnerModal;
