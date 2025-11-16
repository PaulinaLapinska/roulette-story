import React from "react";
import { FunctionComponent } from "react";
// import { InformationFilled } from "../Icons";

import "./InfoBox.css";

export type InfoBoxProps = {
  text: string;
};

const InfoBox: FunctionComponent<InfoBoxProps> = ({ text }) => {
  const [rulesVisible, setRulesVisible] = React.useState(false);
  const title = "Game status";
  return (
    <div className="info-box">
      <span className="info-box__bar" />
      <div className="info-box__icon">{/* <InformationFilled /> */}</div>

      <div className="info-box__content">
        <div className="row">
          <div className="col">
            <span className="info-box__title">{title && <h3>{title}</h3>}</span>
            {text && <p>{text}</p>}
          </div>
          <div className="col">
            <span className="info-box__toggle" onClick={() => setRulesVisible((prev) => !prev)}>
              {rulesVisible ? "Hide rules" : "See rules"}
            </span>
            {rulesVisible && (
              <div className="info-box__rules">
                <h4>Game Rules:</h4>
                <ul>
                  <li>Last one standing wins</li>
                  <li>Each player starts with 0 tokens</li>
                  <li>Skip turn costs 1 token</li>
                  <li>Reverse turn order costs 2 tokens</li>
                  <li>Adding a bullet results in rest of the players gaining 1 token</li>
                  <li>Pulling the trigger has no cost</li>
                  <li>There is only one bullet at a time in the chambers</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
