import React from "react";
import classNames from "classnames";
import Slider from "rc-slider";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeMuteIcon from "@material-ui/icons/VolumeMute";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import FastRewindIcon from "@material-ui/icons/FastRewind";
import FastForwardIcon from "@material-ui/icons/FastForward";

import videoFromAssets from "../../assets/videos/tears-of-steel-battle-clip-medium.mp4";

import "./manualPlayer.scss";

const ManualPlayer = ({
  videoPlayerRef,
  playPauseHandler,
  isPlaying,
  setMuteHandler,
  setVolumeHandler,
  volume,
  muted,
  formatTime,
  currentTime,
  duration,
  fullscreen,
  fullscreenHandler,
  playerContainerRef,
  hover,
  setHover,
  toPercentage,
  mouseDistance,
  setTimeHandler,
  skipTimeHandler,
  handleChange,
  quality,
}) => {
  const iconStyles = {
    fill: "#fff",
    height: 16,
    width: 16,
  };

  const volumeIconHandler = () => {
    let icon = <VolumeUpIcon {...iconStyles} />;
    if (muted) {
      icon = <VolumeOffIcon {...iconStyles} />;
    } else if (volume <= 30) {
      icon = <VolumeMuteIcon {...iconStyles} />;
    } else if (volume > 30 && volume <= 60) {
      icon = <VolumeDownIcon {...iconStyles} />;
    }
    return icon;
  };

  return (
    <div className="video-container" ref={playerContainerRef}>
      <video ref={videoPlayerRef} id="videoPlayer" width="500" height="500">
        <source
          //src="http://www.w3schools.com/html/mov_bbb.mp4"
          src={videoFromAssets}
          type="video/mp4"
          size={quality}
        />
      </video>
      <div className="video-controls">
        <button
          type="button"
          className="control-button skip-time"
          onClick={() => skipTimeHandler(-5)}
        >
          <FastRewindIcon {...iconStyles} />
        </button>
        <button
          type="button"
          className="control-button playback-button"
          onClick={playPauseHandler}
        >
          {isPlaying ? (
            <PauseIcon {...iconStyles} height={16} width={16} />
          ) : (
            <PlayArrowIcon {...iconStyles} height={16} width={16} />
          )}
        </button>
        <button
          type="button"
          className="control-button skip-time"
          onClick={() => skipTimeHandler(+5)}
        >
          <FastForwardIcon {...iconStyles} />
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
                      "timeline-hover-notch-inverted": hover.time < currentTime,
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
        <div className="controls-right">
          <div className="quality-container">
            <select
              class="qualitySelect"
              autocomplete="off"
              onChange={handleChange}
            >
              <option selected>fullHD</option>
              <option>720p</option>
              <option>360p</option>
            </select>
          </div>
          <button
            type="button"
            className="control-button screen-toggle"
            onClick={fullscreenHandler}
          >
            {fullscreen ? (
              <FullscreenExitIcon {...iconStyles} />
            ) : (
              <FullscreenIcon {...iconStyles} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManualPlayer;
