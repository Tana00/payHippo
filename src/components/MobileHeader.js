import React from "react";

import "../pages/style.scss";
import "../pages/responsive.scss";

const MobileHeader = () => {
  return (
    <div id="mobile_header">
      <svg
        width="150"
        viewBox="0 0 254 86"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect width="254" height="86" fill="url(#pattern0)" />
        <defs>
          <pattern
            id="pattern0"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlinkHref="#image0"
              transform="translate(-0.0488917) scale(0.00149155 0.00440529)"
            />
          </pattern>
          <image
            id="image0"
            width="736"
            height="227"
            xlinkHref="data:image/png;base64,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"
          />
        </defs>
      </svg>
      <p>Hassle-Free Financing for all Business Owners</p>
    </div>
  );
};

export default MobileHeader;
