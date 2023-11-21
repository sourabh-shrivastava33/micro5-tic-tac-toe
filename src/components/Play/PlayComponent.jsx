import { useState } from "react";
import ChoosePlayer from "../ChoosePlayer/ChoosePlayer";
import GameStartButton from "../GameStartButton/GameStartButton";
import PlayCss from "./PlayComponent.module.css";
import GamePlayArea from "../GamePlay/GamePlayArea";
import toast from "react-hot-toast";
const PlayComponent = () => {
  const [playGame, setPlayGame] = useState(
    sessionStorage.getItem("play") ?? false
  );
  const [yourChoice, setYourChoice] = useState(
    sessionStorage.getItem("choice") ?? null
  );

  function handleClick() {
    console.log(yourChoice);
    if (!yourChoice) {
      toast.error("Pick a player", {
        duration: 2000,
        style: {
          backgroundColor: "#192A32",
          color: "#F2B237",
          width: "13.75rem",
          height: "2.25rem",
          fontWeight: "600",
        },
      });
    } else {
      sessionStorage.setItem("play", true);
      setPlayGame(true);
    }
  }
  function handlePlayerChoice(choice) {
    setYourChoice(choice);
    sessionStorage.setItem("choice", choice);
  }
  return (
    <div className={PlayCss.play}>
      {!playGame ? (
        <>
          <p className={PlayCss.signs}>
            <img src="cross.svg" alt="cross sign" />
            <img src="circle.svg" alt="circle sign" />
          </p>
          <ChoosePlayer onClick={handlePlayerChoice} yourChoice={yourChoice} />
          <GameStartButton type="primary" onClick={handleClick}>
            NEW GAME ( VS CPU )
          </GameStartButton>
          <GameStartButton type="secondary">
            NEW GAME ( VS HUMAN ) Coming soon
          </GameStartButton>

          <GameStartButton type="tertiary" />
        </>
      ) : (
        <GamePlayArea
          yourChoice={yourChoice}
          setPlayGame={setPlayGame}
          setYourChoice={setYourChoice}
        />
      )}
    </div>
  );
};

export default PlayComponent;
