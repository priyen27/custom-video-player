import React, { useEffect, useState } from "react";
import CustomVideoPlayer from "./CustomVideoPlayer";

const CustomVideoPlayerContainer = ({
  src,
  height,
  width,
  controls,
  autoplay,
}) => {
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(false);
  const [length, setLength] = useState(null);
  const [formattedLength, setFormattedLength] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [formattedTime, setFormattedTime] = useState(null);
  const [volume, setVolume] = useState(0.5);

  const v = document.getElementById("v");

  const onCurrentTime = () => {
    let cur = document.getElementById("v").currentTime;
    cur = cur.toFixed();
    let formattedTime = cur.toHHMMSS();
    setCurrentTime(cur);
    setFormattedTime(formattedTime);

    if (parseInt(currentTime) === parseInt(length)) {
      setPaused(true);
    }

    return cur;
  };

  const duration = () => {
    let dur = document.getElementById("v").duration;
    dur = dur.toFixed();
    //let fml = dur.toHHMMSS();
    setLength(dur);
    setFormattedLength(0);

    return dur;
  };

  const onPlay = () => {
    duration();
    const play_pause = document.querySelector(".play_pause");
    setPaused(!paused);

    if (paused) {
      v.play();
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };

  const customTime = () => {
    const time_range = document.querySelector(".time_range");
    document.getElementById("v").currentTime = time_range.value;
    setCurrentTime(time_range && time_range.value);
  };

  const customVolume = () => {
    const volume_range = document.querySelector(".volume_range");
    document.getElementById("v").volume = volume_range.value;
    setVolume(volume_range && volume_range.value);

    if (volume_range.value === 0) {
      setMuted(true);
    } else {
      setMuted(false);
    }
  };

  const onMute = () => {
    document.getElementById("v").muted = true;

    setMuted(true);

    if (muted) {
      document.getElementById("v").muted = false;
      setMuted(false);
    } else {
      document.getElementById("v").muted = true;
      setMuted(true);
    }
  };

  useEffect(() => {
    customVolume();
    setInterval(() => setCurrentTime(currentTime), 10);

    setInterval(() => setLength(duration()), 10);
  });

  return (
    <CustomVideoPlayer
      onMute={onMute}
      onPlay={onPlay}
      onCurrentTime={onCurrentTime}
      customTime={customTime}
      formattedLength={formattedLength}
      formattedTime={formattedTime}
      volume={volume}
      paused={paused}
      muted={muted}
      currentTime={currentTime}
      length={length}
      src={src}
      height={height}
      width={width}
      controls={controls}
      autoplay={autoplay}
      customVolume={customVolume}
    />
  );
};

export default CustomVideoPlayerContainer;
