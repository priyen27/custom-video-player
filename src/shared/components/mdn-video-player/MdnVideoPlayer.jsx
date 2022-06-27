import React from "react";

const MdnVideoPlayer = () => {
  return (
    <div id="media-player">
      <video id="media-video" controls>
        <source src="parrots.mp4" type="video/mp4" />
      </video>
      <div id="media-controls"></div>
    </div>
  );
};

export default MdnVideoPlayer;
