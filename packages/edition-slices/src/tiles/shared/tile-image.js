import React from "react";
import { TcView } from "@times-components/utils";
import { PlayIcon } from "@times-components/video";
import Image from "@times-components/image";
import { playIconStyles } from "./styles";

const TileImage = ({ hasVideo, style, ...props }) => {
  if (!hasVideo) {
    return <Image style={style} {...props} />;
  }

  return (
    <TcView style={style}>
      <Image {...props} />
      <TcView style={playIconStyles}>
        <PlayIcon />
      </TcView>
    </TcView>
  );
};

export default TileImage;
