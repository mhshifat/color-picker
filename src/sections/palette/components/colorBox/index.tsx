import chroma from "chroma-js";
import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import "./styles.css";

interface Props {
  background: string;
  name: string;
  moreUrl?: string;
}

const ColorBox: React.FC<Props> = ({ background, name, moreUrl }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const isDarkColor = chroma(background).luminance() <= 0.08;
  const isLightColor = chroma(background).luminance() >= 0.7;
  const handleCopiedStateOnCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      style={{
        background,
      }}
      className="ColorBox"
    >
      <div
        style={{
          background,
        }}
        className={`copy-overlay ${copied && "show"}`}
      />
      <div className={`copy-msg ${copied && "show"}`}>
        <h1>copied!</h1>
        <p className={isLightColor ? "dark-text" : ""}>{background}</p>
      </div>
      <div className="copy-container">
        <div className="box-content">
          <span className={isDarkColor ? "light-text" : ""}>{name}</span>
        </div>
        <CopyToClipboard text={background} onCopy={handleCopiedStateOnCopy}>
          <button className={`copy-btn ${isLightColor ? "dark-text" : ""}`}>
            Copy
          </button>
        </CopyToClipboard>
      </div>
      {moreUrl && (
        <Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
          <span className={`${isLightColor ? "dark-text" : ""} see-more`}>
            More
          </span>
        </Link>
      )}
    </div>
  );
};

export default ColorBox;
