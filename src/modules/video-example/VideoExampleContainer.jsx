import React, { useEffect } from "react";
import Bowser from "bowser";

import VideoExample from "./VideoExample";

const VideoExampleContainer = () => {
  // methods return a only device Orientation

  const getDeviceOrientation = () => {
    if (window.matchMedia("(orientation: portrait)").matches) {
      return "portrait";
    }
    return "landscape";
  };

  const isIpad = () => {
    const ua = window.navigator.userAgent;
    if (ua.indexOf("iPad") > -1) {
      return true;
    }
    if (ua.indexOf("Macintosh") > -1) {
      try {
        document.createEvent("TouchEvent");
        return true;
      } catch (e) {} // eslint-disable-line
    }
    return false;
  };

  // methods return a device-type & Orientation

  const getDeviceMetadata = () => {
    const bowser = Bowser.getParser(window.navigator.userAgent);
    // For Getting browserName
    const browserName = bowser.getBrowserName();
    console.log(">>>browserName", browserName);

    // For Getting browser version
    const browserVersion = bowser.getBrowserVersion();
    console.log(">>>browserVersion", browserVersion);

    // For Getting platform type whether desktop, tablet or mobile
    const platformType = bowser.getPlatformType();
    console.log(">>>platformType", platformType);

    return {
      deviceType: isIpad() ? "tablet" : bowser.getPlatformType(),
      orientation: getDeviceOrientation(),
      browser: bowser.getBrowserName().replace(/\s/g, "-").toLowerCase(),
    };
  };

  useEffect(() => {
    getDeviceMetadata();
  }, []);
  return <VideoExample />;
};

export default VideoExampleContainer;
