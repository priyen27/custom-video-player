import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Slider from "rc-slider";

import useVideoPlayer from "./useVideoPlayer";

import { ReactComponent as Backward } from "./icons/backward.svg";
import { ReactComponent as Play } from "./icons/play.svg";
import { ReactComponent as Pause } from "./icons/pause.svg";
import { ReactComponent as Forward } from "./icons/forward.svg";
import { ReactComponent as VolumeMute } from "./icons/volume-mute.svg";
import { ReactComponent as VolumeOff } from "./icons/volume-off.svg";
import { ReactComponent as VolumeDown } from "./icons/volume-down.svg";
import { ReactComponent as VolumeUp } from "./icons/volume-up.svg";
import { ReactComponent as Expand } from "./icons/expand.svg";
import { ReactComponent as Compress } from "./icons/compress.svg";

const CustomVideoPlayer = ({
  source,
  poster,
  active,
  setActive,
  hover,
  setHover,
  toPercentage,
  mouseDistance,
  formatTime,
}) => {
  const {
    playerContainerRef,
    videoPlayerRef,
    isPlaying,
    playPauseHandler,
    currentTime,
    skipTimeHandler,
    setTimeHandler,
    volume,
    setVolumeHandler,
    muted,
    setMuteHandler,
    duration,
    fullscreen,
    fullscreenHandler,
    loading,
  } = useVideoPlayer();

  const [controls, setControls] = useState(false);

  useEffect(() => {
    if (!isPlaying) {
      setActive(true);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (controls) return setActive(true);
    const timer = setTimeout(() => {
      if (isPlaying) {
        setActive(false);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [controls]);

  const iconStyles = {
    fill: "#fff",
    height: 16,
    width: 16,
  };

  const volumeIconHandler = () => {
    let icon = <VolumeUp {...iconStyles} />;
    if (muted) {
      icon = <VolumeMute {...iconStyles} />;
    } else if (volume <= 30) {
      icon = <VolumeOff {...iconStyles} />;
    } else if (volume > 30 && volume <= 60) {
      icon = <VolumeDown {...iconStyles} />;
    }
    return icon;
  };

  return (
    <div className="custom-video-player" ref={playerContainerRef}>
      <video
        ref={videoPlayerRef}
        id="videoPlayer"
        className="video-player"
        src={source}
        poster={poster}
      >
        <track default kind="captions" srcLang="en" src="" />
      </video>
      {/* {loading && (
        <div className="loading-spinner">
          <GoogleLoader width={50} height={50} />
        </div>
      )} */}
      <div
        className="video-overlay"
        onPointerEnter={() => setControls(true)}
        onPointerLeave={() => setControls(false)}
      >
        <div
          className={classNames("overlay-container", {
            "overlay-container-active": active,
          })}
        >
          <div
            className="overlay-play-pause"
            role="presentation"
            onClick={playPauseHandler}
            onDoubleClick={fullscreenHandler}
          />
          <div className="progress">
            <div className="video-progress-bar">
              <div className="timeline-track">
                <div
                  className="timeline-hover-track"
                  role="presentation"
                  onClick={() => setTimeHandler(hover.time)}
                  onMouseEnter={() =>
                    setHover((hoverVal) => ({ ...hoverVal, show: true }))
                  }
                  onMouseMove={(e) => {
                    const distance = mouseDistance(e);
                    const time = distance * duration;
                    setHover((hoverVal) => ({ ...hoverVal, time }));
                  }}
                  onMouseLeave={() =>
                    setHover((hoverVal) => ({ ...hoverVal, show: false }))
                  }
                >
                  <div
                    className={classNames("timeline-hover-info", {
                      "timeline-hover-info-visible": hover.show,
                    })}
                    style={{ left: toPercentage(hover.time, duration) }}
                  >
                    <div
                      className={classNames("timeline-hover-notch", {
                        "timeline-hover-notch-inverted":
                          hover.time < currentTime,
                      })}
                    />
                    <div className="timeline-hover-time">
                      {formatTime(hover.time)}
                    </div>
                  </div>
                </div>
                <div
                  className="timeline-scrubbed"
                  style={{ width: toPercentage(currentTime, duration) }}
                />
              </div>
            </div>
          </div>
          <div className="controls">
            <div className="controls-left">
              <button
                type="button"
                className="control-button skip-time"
                onClick={() => skipTimeHandler(-5)}
              >
                <Backward {...iconStyles} />
              </button>
              <button
                type="button"
                className="control-button playback-button"
                onClick={playPauseHandler}
              >
                {isPlaying ? (
                  <Pause {...iconStyles} height={16} width={16} />
                ) : (
                  <Play {...iconStyles} height={16} width={16} />
                )}
              </button>
              <button
                type="button"
                className="control-button skip-time"
                onClick={() => skipTimeHandler(+5)}
              >
                <Forward {...iconStyles} />
              </button>
              <div className="volume">
                <button
                  type="button"
                  className="control-button volume-toggle"
                  onClick={setMuteHandler}
                >
                  {volumeIconHandler()}
                </button>
                <div className="slider-wrapper">
                  <Slider
                    min={0}
                    max={100}
                    value={volume}
                    onChange={(value) => {
                      setVolumeHandler(value);
                    }}
                    className="Volume__slider"
                    railStyle={{ backgroundColor: "#fff" }}
                    trackStyle={{
                      background: "#6d3fdf",
                    }}
                    handleStyle={{ borderColor: "#aa80ff" }}
                  />
                </div>
              </div>
              <div className="control-button durations">
                {`${formatTime(currentTime)} / ${formatTime(duration)}`}
              </div>
            </div>
            <div className="controls-right">
              <button
                type="button"
                className="control-button screen-toggle"
                onClick={fullscreenHandler}
              >
                {fullscreen ? (
                  <Compress {...iconStyles} />
                ) : (
                  <Expand {...iconStyles} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
