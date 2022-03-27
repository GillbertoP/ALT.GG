import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = ({ size = 100 }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: "9999",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      }}
    >
      <Spinner
        style={{ width: size, height: size }}
        animation="border"
      ></Spinner>
    </div>
  );
};

export default Loading;
