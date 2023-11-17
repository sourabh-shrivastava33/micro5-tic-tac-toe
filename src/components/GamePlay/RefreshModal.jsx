import RefreshCss from "./RefreshModal.module.css";
const RefreshModal = ({
  setGameArr,
  setWinner,
  setYourChoice,
  yourChoice,
  setPlayGame,
  setCurrentTurn,
  setShowModal,
}) => {
  return (
    <div className={RefreshCss.refreshContainer}>
      <h2 className={RefreshCss.head}>Do you want to quit?</h2>
      <span className={RefreshCss.buttons}>
        <button
          className={RefreshCss.playAgain}
          onClick={() => {
            setGameArr(Array(9).fill(null));
            setWinner(null);
            setCurrentTurn(yourChoice);
            setShowModal(false);
          }}
        >
          play again
        </button>
        <button
          className={RefreshCss.quit}
          onClick={() => {
            setGameArr(Array(9).fill(null));
            setWinner(null);
            setPlayGame(false);
            setYourChoice(null);
            sessionStorage.removeItem("play");
            sessionStorage.removeItem("choice");
            sessionStorage.removeItem("score");
          }}
        >
          quit
        </button>
      </span>
    </div>
  );
};

export default RefreshModal;
