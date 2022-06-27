import { useState, useEffect, useCallback } from 'react';

const usePlayer = () => {
  const [player, setPlayer] = useState(null);
  const [videoPlayer, setVideoPlayer] = useState(null);

  const [isPlaying, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [loading, setLoading] = useState(false);

  const playerContainerRef = useCallback((node) => {
    if (node !== null) {
      setPlayer(node);
    }
  }, []);

  const videoPlayerRef = useCallback((node) => {
    if (node !== null) {
      setVideoPlayer(node);
    }
  }, []);

  const playPauseHandler = () => (
    videoPlayer && videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause()
  );

  const skipTimeHandler = (time) => {
    setLoading(true);
    videoPlayer.currentTime += time;
  };

  const setTimeHandler = (time) => {
    setLoading(true);
    videoPlayer.currentTime = time;
  };

  const setVolumeHandler = (volumeLevel) => {
    videoPlayer.muted = false;
    videoPlayer.volume = (volumeLevel / 100);
  };

  const setMuteHandler = () => {
    if (videoPlayer.muted) {
      videoPlayer.volume = 1;
    } else {
      videoPlayer.volume = 0;
    }
    videoPlayer.muted = (videoPlayer.volume === 0);
  };

  const openFullscreen = () => {
    if (!player) return;

    if (player.requestFullscreen) {
      player.requestFullscreen();
    } else if (player.mozRequestFullScreen) {
      player.mozRequestFullScreen();
    } else if (player.webkitRequestFullscreen) {
      player.webkitRequestFullscreen();
    } else if (player.msRequestFullscreen) {
      player.msRequestFullscreen();
    }
  };

  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  const fullscreenHandler = () => {
    if (fullscreen) {
      closeFullscreen();
    } else {
      openFullscreen();
    }
  };

  useEffect(() => {
    if (!videoPlayer) return;

    const updatePlaying = (event) => {
      setPlaying(event.type !== 'pause');
    };

    videoPlayer.addEventListener('play', updatePlaying);
    videoPlayer.addEventListener('pause', updatePlaying);
    videoPlayer.addEventListener('playing', updatePlaying);

    // eslint-disable-next-line
    return () => {
      videoPlayer.removeEventListener('play', updatePlaying);
      videoPlayer.removeEventListener('pause', updatePlaying);
      videoPlayer.removeEventListener('playing', updatePlaying);
    };
  }, [videoPlayer]);

  useEffect(() => {
    if (!videoPlayer) return;

    const updateLoading = () => {
      setLoading(true);
    };

    videoPlayer.addEventListener('waiting', updateLoading);

    // eslint-disable-next-line
    return () => {
      videoPlayer.removeEventListener('waiting', updateLoading);
    };
  }, [videoPlayer]);

  useEffect(() => {
    if (!videoPlayer) return;

    const updateLoading = () => {
      setLoading(false);
    };

    videoPlayer.addEventListener('canplay', updateLoading);

    // eslint-disable-next-line
    return () => {
      videoPlayer.removeEventListener('canplay', updateLoading);
    };
  }, [videoPlayer]);

  useEffect(() => {
    if (!videoPlayer) return;

    const changeVolume = () => {
      if (videoPlayer.muted) {
        setVolume(0);
        setMuted(true);
      } else {
        setVolume(videoPlayer.volume * 100);
        setMuted(false);
      }
    };

    videoPlayer.addEventListener('volumechange', changeVolume);
    videoPlayer.addEventListener('mute', changeVolume);

    // eslint-disable-next-line
    return () => {
      videoPlayer.removeEventListener('volumechange', changeVolume);
      videoPlayer.removeEventListener('mute', changeVolume);
    };
  }, [videoPlayer]);

  useEffect(() => {
    if (!videoPlayer) return;

    const updateDuration = () => {
      setDuration(videoPlayer.duration);
    };

    videoPlayer.addEventListener('loadedmetadata', updateDuration);

    // eslint-disable-next-line
    return () => videoPlayer.removeEventListener('loadedmetadata', updateDuration)
  }, [videoPlayer]);

  useEffect(() => {
    if (!videoPlayer) return;

    const updateTime = () => {
      setCurrentTime(videoPlayer.currentTime);
    };

    videoPlayer.addEventListener('timeupdate', updateTime);

    // eslint-disable-next-line
    return () => videoPlayer.removeEventListener('timeupdate', updateTime)
  }, [videoPlayer, currentTime]);

  useEffect(() => {
    if (!player) return;

    function onFullScreen() {
      setFullscreen(document.webkitFullscreenElement !== null);
    }

    player.addEventListener('webkitfullscreenchange', onFullScreen);
    player.addEventListener('mozfullscreenchange', onFullScreen);
    player.addEventListener('fullscreenchange', onFullScreen);
    player.addEventListener('msfullscreenchange', onFullScreen);

    // eslint-disable-next-line
    return () => {
      player.removeEventListener('webkitfullscreenchange', onFullScreen);
      player.removeEventListener('mozfullscreenchange', onFullScreen);
      player.removeEventListener('fullscreenchange', onFullScreen);
      player.removeEventListener('msfullscreenchange', onFullScreen);
    };
  }, [player]);

  return {
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
  };
};

export default usePlayer;
