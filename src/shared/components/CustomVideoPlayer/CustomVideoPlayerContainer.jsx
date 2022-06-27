import React, { useState } from "react";

import CustomVideoPlayer from "./CustomVideoPlayer";
import "./custom-video-player.scss";
import "./_slider.scss";

const CustomVideoPlayerContainer = ({ source, poster, deviceType }) => {
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState({ show: false, time: 0 });

  const toPercentage = (value, of) => `${(value / of) * 100}%`;

  const mouseDistance = (e) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    let mousePosition = e.pageX - left;
    if (mousePosition > width) {
      mousePosition = width;
    }
    return mousePosition / width;
  };

  const formatTime = (time) =>
    new Date(time * 1000).toISOString().substr(14, 5);

  return (
    <CustomVideoPlayer
      source={source}
      poster={poster}
      active={active}
      setActive={setActive}
      hover={hover}
      setHover={setHover}
      toPercentage={toPercentage}
      mouseDistance={mouseDistance}
      formatTime={formatTime}
      deviceType={deviceType}
    />
  );
};

export default CustomVideoPlayerContainer;
