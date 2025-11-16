import React, { useEffect, useRef, useState } from "react";
import { FunctionComponent } from "react";

import "./GameLog.css";

export type GameLogProps = {
    gameLog: string[];
};

const GameLog: FunctionComponent<GameLogProps> = ({ gameLog }) => {
    return (
        <div className='game-log'>
            <span className='game-log__bar' />
            <h3 className="game-log__title">
                Game Log
            </h3>
            <div className='game-log__content'>
                {gameLog.map((entry, index) => (
                    <div className='game-log__row' key={index}>
                        <span className='game-log__gameLog'>
                            <h4>{entry}</h4>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameLog;