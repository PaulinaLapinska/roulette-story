import React from "react";
import { FunctionComponent } from "react";
// import { InformationFilled } from "../Icons";

import "./PlayersList.css";

export type PlayersListProps = {
	players: {
        name: string,
        isAlive: boolean,
        tokens: number,
        isAI: boolean,
    }[];
    activePlayer: number;
};

const PlayersList: FunctionComponent<PlayersListProps> = ({ players, activePlayer }) => {
	return (
		<div className='players-list'>
            <h3 className="players-list__title">Players</h3>
			<span className='players-list__bar' />
			{
                players.map((player) => {
                    return (
                        <div key={player.name} className={`player-item ${activePlayer === players.indexOf(player) ? "active" : ""}`}>
                            <div>Name: {player.name} {player.isAI ? "(AI)" : ""}</div>
                            <div>Tokens: {player.tokens}</div>
                            <div>Status: {player.isAlive ? "Alive" : "Dead"}</div>
                        </div>
                    );
                })
            }
		</div>
	);
};

export default PlayersList;
