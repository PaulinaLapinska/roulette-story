import React from "react";
import { FunctionComponent } from "react";
// import { InformationFilled } from "../Icons";

import "./DecisionWidget.css";

export type DecisionWidgetProps = {
  activePlayer: number;
  players: {
    name: string;
    isAlive: boolean;
    tokens: number;
    isAI?: boolean;
  }[];
  onSkipTurn: () => void;
  onReverseTurn: () => void;
  onPullTrigger: () => void;
  onAddBullet: (index: number) => void;
  bulletIndex: number;
  enableControls: boolean;
};

const DecisionWidget: FunctionComponent<DecisionWidgetProps> = ({
  activePlayer,
  players,
  onSkipTurn,
  onReverseTurn,
  onPullTrigger,
  onAddBullet,
  bulletIndex,
  enableControls,
}) => {
  // Only show add bullet if no bullet is present
  if (bulletIndex === -1 && !players[activePlayer].isAI) {
    return (
      <div className="decision-widget">
        <span className="decision-widget__bar" />
        <h3>Available actions:</h3>
        <div className="decision-widget__actions">
          {[0, 1, 2, 3, 4, 5].map((idx) => (
            <button key={idx} onClick={() => onAddBullet(idx)}>
              Add bullet at {idx + 1}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="decision-widget">
      <span className="decision-widget__bar" />
      <h3>Available actions:</h3>
      <div className="decision-widget__actions">
        <button
          disabled={players[activePlayer].tokens <= 0 || !enableControls}
          onClick={onSkipTurn}
        >
          Skip turn
        </button>
        <button
          disabled={players[activePlayer].tokens <= 0 || !enableControls}
          onClick={onReverseTurn}
        >
          Reverse turn
        </button>
        <button onClick={onPullTrigger} disabled={!enableControls}>Pull trigger</button>
      </div>
    </div>
  );
};

export default DecisionWidget;
