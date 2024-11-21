import React from "react";
import "./About.css";
export const About = () => {
  const onClick = () => {
    console.log("Button clicked");
  };
  return (
    <button onClick={onClick} className="about-button">
      Hello world
    </button>
  );
};
