import { useState } from "react";
import { sign } from "../ChoosePlayer/sign";
import Squares from "../Squares/Squares";
import gamePlayCss from "./GamePlayArea.module.css";
import { bestMove, emptyIndex, getWinner } from "../../utils/helper";
import Modal from "./Modal";
import WinnerModal from "./WinnerModal";
import RefreshModal from "./RefreshModal";

const GamePlayArea = ({ yourChoice, setYourChoice, setPlayGame }) => {
  const [gameArr, setGameArr] = useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState(yourChoice);
  const [showModal, setShowModal] = useState(false);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState(
    JSON.parse(sessionStorage.getItem("score")) ?? {
      you: 0,
      pc: 0,
      tie: 0,
    }
  );
  const computerChoice = yourChoice === "cross" ? "circle" : "cross";
  function handleSquareClick(index) {
    const gameArrCopy = [...gameArr];
    if (gameArrCopy[index] !== null || currentTurn !== yourChoice || winner)
      return;
    gameArrCopy[index] = currentTurn;
    const result = getWinner(gameArrCopy);
    setGameArr(gameArrCopy);
    if (result) {
      handleScore(result);
      setWinner(result);
      return;
    }
    setCurrentTurn((prev) => (prev === "cross" ? "circle" : "cross"));
    computerTurn(gameArrCopy, emptyIndex(gameArrCopy));
  }
  function handleScore(result) {
    if (result === yourChoice) {
      setScore({ ...score, you: score.you + 1 });
      setToSessionStorage({ ...score, you: score.you + 1 });
    } else if (result === computerChoice) {
      setScore({ ...score, pc: score.pc + 1 });
      setToSessionStorage({ ...score, pc: score.pc + 1 });
    } else {
      setScore({ ...score, tie: score.tie + 1 });
      setToSessionStorage({ ...score, tie: score.tie + 1 });
    }
  }
  function setToSessionStorage(scoreObj) {
    sessionStorage.setItem("score", JSON.stringify(scoreObj));
  }

  function computerTurn(gameArrCopy, index) {
    const gameArrC = gameArrCopy.slice();

    if (!index || winner) return;
    const turn = bestMove(gameArrC, yourChoice, computerChoice);

    setTimeout(() => {
      gameArrC[turn] = computerChoice;
      setGameArr(gameArrC);
      const result = getWinner(gameArrC);
      if (result) {
        handleScore(result);
        setWinner(result);
        return;
      }

      setCurrentTurn((prev) => (prev === "cross" ? "circle" : "cross"));
    }, 2000);
  }

  function handleRefresh() {
    setShowModal(true);
  }
  function handleQuit() {
    setGameArr(Array(9).fill(null));
    setWinner(null);
    setPlayGame(false);
    setYourChoice(null);
    sessionStorage.removeItem("play");
    sessionStorage.removeItem("choice");
    sessionStorage.removeItem("score");
  }
  function handleNextRound() {
    setGameArr(Array(9).fill(null));
    setWinner(null);
    setCurrentTurn(yourChoice);
  }
  function handlePlayAgain() {
    setGameArr(Array(9).fill(null));
    setWinner(null);
    setCurrentTurn(yourChoice);
    setScore({ you: 0, pc: 0, tie: 0 });
    setToSessionStorage({ you: 0, pc: 0, tie: 0 });
    setShowModal(false);
  }

  return (
    <div className={gamePlayCss.gamePlay}>
      <p className={gamePlayCss.signs}>
        <img src="cross.svg" alt="cross sign" />
        <img src="circle.svg" alt="circle sign" />
      </p>
      <div className={gamePlayCss.turns}>
        <span className="sign">
          {currentTurn === "cross" ? sign.cross : sign.circle}
        </span>{" "}
        <span>turn</span>
      </div>
      <button className={gamePlayCss.refresh} onClick={handleRefresh}>
        <img src="refresh.svg" alt="refresh" />
      </button>
      {gameArr.map((item, i) => {
        return (
          <Squares key={i} index={i} item={item} onClick={handleSquareClick} />
        );
      })}
      <div className={gamePlayCss.yourScore}>
        <span>{yourChoice === "cross" ? "X" : "O"} (you)</span>
        <span>{score.you}</span>
      </div>
      <div className={gamePlayCss.tiesScore}>
        <span>TIES</span>
        <span>{score.tie}</span>
      </div>
      <div className={gamePlayCss.cpuScore}>
        <span>{yourChoice === "cross" ? "O" : "X"} (CPU)</span>
        <span>{score.pc}</span>
      </div>
      {showModal && (
        <Modal setShowModal={setShowModal} type="refresh">
          <RefreshModal
            handleQuit={handleQuit}
            handlePlayAgain={handlePlayAgain}
          />
        </Modal>
      )}
      {winner && (
        <Modal type="win">
          <WinnerModal
            handleQuit={handleQuit}
            handleNextRound={handleNextRound}
            winner={winner}
            yourChoice={yourChoice}
          />
        </Modal>
      )}
    </div>
  );
};

export default GamePlayArea;
