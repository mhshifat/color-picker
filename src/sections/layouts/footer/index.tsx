import React from "react";
import "./styles.css";

interface Props {
  paletteName: string;
  emoji: string;
}

const Footer: React.FC<Props> = ({ paletteName, emoji }) => {
  return (
    <footer className="footer">
      {paletteName}
      <span className="emoji">{emoji}</span>
    </footer>
  );
};

export default Footer;
