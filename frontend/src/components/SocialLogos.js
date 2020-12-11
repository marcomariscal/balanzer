import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faDiscord } from "@fortawesome/free-brands-svg-icons";

import "./SocialLogos.scss";

const SocialLogos = () => {
  return (
    <div className="SocialLogos">
      <span>
        <a href="https://github.com/marcomariscal/balanzer">
          <FontAwesomeIcon className="mr-2" icon={faGithub} size={"2x"} />
        </a>
        <a href="https://discord.com/channels/786973347681534002/786973347681534005">
          <FontAwesomeIcon className="mr-2" icon={faDiscord} size={"2x"} />
        </a>
      </span>
    </div>
  );
};

export default SocialLogos;
