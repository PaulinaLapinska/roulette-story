import React from "react";
import { FunctionComponent } from "react";
// import { InformationFilled } from "../Icons";

import "./InfoBox.css";

export type InfoBoxProps = {
  text: string;
};

const InfoBox: FunctionComponent<InfoBoxProps> = ({ text }) => {
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
            <span onClick={() => {}}>See rules</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
