import { useEffect } from "react";

const usePlayer = () => {
  const video = document.getElementById("video");

  // Buttons
  const playButton = document.getElementById("play-pause");
  const muteButton = document.getElementById("mute");
  const fullScreenButton = document.getElementById("full-screen");

  // Sliders
  const seekBar = document.getElementById("seek-bar");
  const volumeBar = document.getElementById("volume-bar");

  useEffect(() => {
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
  });

  useEffect(() => {
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
  });

  useEffect(() => {
    fullScreenButton.addEventListener("click", function () {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen(); // Firefox
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen(); // Chrome and Safari
      }
    });
  });
};

export default usePlayer;
