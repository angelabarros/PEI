import React, { Fragment } from "react";
import flamengo from "../../images/flamengo.png";
import "../../index.css";

export default function InitialPage() {
  return (
    <Fragment>
      <div className="imagem">
        <div className="titulo">
          <h1>Sejam bem vindos!</h1>
        </div>
        <img src={flamengo} alt="Logo" />
      </div>
    </Fragment>
  );
}
