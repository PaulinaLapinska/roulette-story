import React, { useEffect, useState } from "react";
import { FunctionComponent } from "react";

import InfoBox from "../InfoBox/InfoBox";
import DecisionWidget from "../DecisionWidget/DecisionWidget";
import "./GameContainer.css";
import PlayersList from "../PlayersList/PlayersList";
import GameLog from "../GameLog/GameLog";

export type GameContainerProps = {
  data: {
    titles: [];
    texts: [];
  };
};

const initialPlayers = [
  {
    name: "Player 1",
    isAlive: true,
    tokens: 0,
    isAI: false,
  },
  {
    name: "Player 2",
    tokens: 0,
    isAlive: true,
    isAI: true,
  },
  {
    name: "Player 3",
    tokens: 0,
    isAlive: true,
    isAI: true,
  },
    {
    name: "Player 4",
    tokens: 0,
    isAlive: true,
    isAI: true,
  },
    {
    name: "Player 5",
    tokens: 0,
    isAlive: true,
    isAI: true,
  },
    {
    name: "Player 6",
    tokens: 0,
    isAlive: true,
    isAI: true,
  },
];

const initialMessage = "You start!";

const GameContainer: FunctionComponent<GameContainerProps> = ({ data }) => {
  const [players, setPlayers] = useState(initialPlayers);
  const [activePlayer, setActivePlayer] = useState(0);
  const [bulletIndex, setBulletIndex] = useState(-1);
  const [chamberIndex, setChamberIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [message, setMessage] = useState(initialMessage);
  const [gameLog, setGameLog] = useState<string[]>([]);

  useEffect(() => {
    if (isGameOver(players)) {
        setMessage("Game over!");
        return;
    }
    if (players[activePlayer].isAI && players[activePlayer].isAlive) {
      const aiTimeout = setTimeout(() => {
        playAITurn();
        setTimeout(nextTurn, 1500);
      }, 1000);
      return () => clearTimeout(aiTimeout);
    }

    if (!players[activePlayer].isAI && players[activePlayer].isAlive) {
      if (bulletIndex === -1) {
        setMessage("Now it's your turn! Please add a bullet.");
      } else {
        setMessage("Now it's your turn! Choose an action.");
      }
    }
  }, [activePlayer, players, bulletIndex]);

  const writeMessage = (msg: string) => {
    setMessage(msg);
    setGameLog((log) => [...log, msg]);
  };

  const resetGame = () => {
    setPlayers(initialPlayers);
    setActivePlayer(0);
    setBulletIndex(-1);
    setChamberIndex(0);
    setReverse(false);
    setMessage(initialMessage);
    setGameLog([]);
  };

  function advanceToNextPlayer() {
    let next = activePlayer;
    do {
      next = reverse
        ? (next - 1 + players.length) % players.length
        : (next + 1) % players.length;
    } while (!players[next].isAlive && next !== activePlayer);
    setActivePlayer(next);
  }

  function pullTrigger() {
    if (bulletIndex === chamberIndex) {
      setPlayers((prev) =>
        prev.map((p, i) => (i === activePlayer ? { ...p, isAlive: false } : p))
      );
      writeMessage(`${players[activePlayer].name} pulled the trigger and died!`);
      setBulletIndex(-1);
    } else {
      writeMessage(
        `${players[activePlayer].name} pulled the trigger and survived.`
      );
    }
    setChamberIndex((prev) => (prev + 1) % 6);
    advanceToNextPlayer();
  }

  const skipTurn = (index: number) => {
    if (players[index].tokens <= 0) {
      return;
    }
    writeMessage(`${players[activePlayer].name} has skipped its turn.`);
    setPlayers((prev) =>
      prev.map((player, i) => (i === index ? { ...player, tokens: player.tokens - 1 } : player))
    );
    advanceToNextPlayer();
  };
  
  function addBullet(index: number) {
    setBulletIndex(index);
    setMessage(`${players[activePlayer].name} added a bullet.`);
    setGameLog((log) => [
      ...log,
      `${players[activePlayer].name} added a bullet.`,
    ]);
    // Give tokens to other alive players
    setPlayers((prev) =>
      prev.map((player, i) =>
        i !== activePlayer && player.isAlive ? { ...player, tokens: player.tokens + 1 } : player
      )
    );
    advanceToNextPlayer();
  }

  function playAITurn() {
    setMessage("AI is playing its turn...");
    setTimeout(() => {
      if (bulletIndex === -1) {
        addBullet(Math.floor(Math.random() * 6));
        return;
      }
      const skip = Math.random() < 0.5;
      const reverseAction = Math.random() < 0.3;
      if (reverseAction && players[activePlayer].tokens > 1) {
        setReverse((prev) => !prev);
        setPlayers((prev) =>
          prev.map((p, i) =>
            i === activePlayer ? { ...p, tokens: p.tokens - 2 } : p
          )
        );
        writeMessage(`${players[activePlayer].name} reversed the turn order.`);
        return;
      }
      if (skip && players[activePlayer].tokens > 0) {
        skipTurn(activePlayer);
        return;
      } else {
        pullTrigger();
        return;
      }
    }, 2000);
  }

  function isGameOver(players: typeof initialPlayers) {
    if (!players[0].isAlive) return true;
    return players.filter((p) => p.isAlive).length <= 1;
  }

  function nextTurn() {
    if (isGameOver(players)) {
      const winner = players.find((p) => p.isAlive);
      setMessage(winner ? `${winner.name} wins!` : "No one wins!");
      setGameLog((log) => [
        ...log,
        winner ? `${winner.name} wins!` : "No one wins!",
      ]);
      return;
    }

    let next = activePlayer;
    do {
      next = reverse
        ? (next - 1 + players.length) % players.length
        : (next + 1) % players.length;
    } while (!players[next].isAlive && next !== activePlayer);
    setActivePlayer(next);
  }

  const handleSkipTurn = () => {
    if (players[activePlayer].tokens > 0) {
      setPlayers((prev) =>
        prev.map((p, i) =>
          i === activePlayer ? { ...p, tokens: p.tokens - 1 } : p
        )
      );
      setMessage(`${players[activePlayer].name} skipped their turn.`);
      setGameLog((log) => [
        ...log,
        `${players[activePlayer].name} skipped their turn.`,
      ]);
      nextTurn();
    }
  };

  const handleReverseTurn = () => {
    if (players[activePlayer].tokens > 0) {
      setPlayers((prev) =>
        prev.map((p, i) =>
          i === activePlayer ? { ...p, tokens: p.tokens - 1 } : p
        )
      );
      setReverse((prev) => !prev);
      setMessage(`${players[activePlayer].name} reversed the turn order.`);
      setGameLog((log) => [
        ...log,
        `${players[activePlayer].name} reversed the turn order.`,
      ]);
      nextTurn();
    }
  };

  const handlePullTrigger = () => {
    pullTrigger();
  };

  const handleAddBullet = (index: number) => {
    addBullet(index);
  };

  return (
    <div className="game-container">
      <span className="game-container__bar" />
      <button onClick={resetGame}>Restart game</button>
      <div className="game-container__content">
        <InfoBox text={message} />
        <div className="row">
          <div className="game-container__side-panel">
            <DecisionWidget
              activePlayer={activePlayer}
              players={players}
              onSkipTurn={handleSkipTurn}
              onReverseTurn={handleReverseTurn}
              onPullTrigger={handlePullTrigger}
              onAddBullet={handleAddBullet}
              bulletIndex={bulletIndex}
              enableControls={
                !players[activePlayer].isAI && players[activePlayer].isAlive
              }
            />
            <PlayersList players={players} activePlayer={activePlayer} />
          </div>
          <GameLog gameLog={gameLog} />
        </div>
      </div>
    </div>
  );
};

export default GameContainer;
