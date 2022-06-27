import React, { useEffect } from "react";

const VideoTest = () => {
  useEffect(() => {
    const video = document.getElementById("video");

    // Buttons
    const playButton = document.getElementById("play-pause");
    const muteButton = document.getElementById("mute");
    const fullScreenButton = document.getElementById("full-screen");

    // Sliders
    const seekBar = document.getElementById("seek-bar");
    const volumeBar = document.getElementById("volume-bar");

    playButton.addEventListener("click", function () {
      if (video.paused === true) {
        // Play the video
        video.play();

        // Update the button text to 'Pause'
        playButton.innerHTML = "Pause";
      } else {
        // Pause the video
        video.pause();

        // Update the button text to 'Play'
        playButton.innerHTML = "Play";
      }
    });

    // Event listener for the full-screen button
    fullScreenButton.addEventListener("click", function () {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen(); // Firefox
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen(); // Chrome and Safari
      }
    });

    //Mute
    muteButton.addEventListener("click", function () {
      if (video.muted === false) {
        // Mute the video
        video.muted = true;

        // Update the button text
        muteButton.innerHTML = "Unmute";
      } else {
        // Unmute the video
        video.muted = false;

        // Update the button text
        muteButton.innerHTML = "Mute";
      }
    });

    // Event listener for the seek bar
    seekBar.addEventListener("change", function () {
      // Calculate the new time
      var time = video.duration * (seekBar.value / 100);

      // Update the video time
      video.currentTime = time;
    });

    // Update the seek bar as the video plays
    video.addEventListener("timeupdate", function () {
      // Calculate the slider value
      var value = (100 / video.duration) * video.currentTime;

      // Update the slider value
      seekBar.value = value;
    });

    // Pause the video when the slider handle is being dragged
    seekBar.addEventListener("mousedown", function () {
      video.pause();
    });

    // Play the video when the slider handle is dropped
    seekBar.addEventListener("mouseup", function () {
      video.play();
    });

    // Event listener for the volume bar
    volumeBar.addEventListener("change", function () {
      // Update the video volume
      video.volume = volumeBar.value;
    });
  }, [document.getElementById("video")]);

  return (
    <div id="video-container">
      <video id="video" width="640" height="365">
        <source
          src="http://www.w3schools.com/html/mov_bbb.mp4"
          type="video/webm"
        />
        <p>
          Your browser doesn't support HTML5 video.
          <a href="videos/mikethefrog.mp4">Download</a> the video instead.
        </p>
      </video>
      <div id="video-controls">
        <button type="button" id="play-pause">
          Play
        </button>
        <input type="range" id="seek-bar" value="0" />
        <button type="button" id="mute">
          Mute
        </button>
        <input
          type="range"
          id="volume-bar"
          min="0"
          max="1"
          step="0.1"
          value="1"
        />
        <button type="button" id="full-screen">
          Full-Screen
        </button>
      </div>
    </div>
  );
};

export default VideoTest;
