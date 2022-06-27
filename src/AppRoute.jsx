import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import VideoTestContainer from "./shared/components/video-test/VideoTestContainer";
import VideoPlayerContainer from "./modules/video-player/VideoPlayerContainer";
import VideoExampleContainer from "./modules/video-example/VideoExampleContainer";
import ManualPlayerContainer from "./modules/manual-player/ManualPlayerContainer";
import GoogleMapsContainer from "./modules/react-google-maps/GoogleMapsContainer";
import MobileOtpContainer from "./modules/mobile-otp-firebase/MobileOtpContainer";

const AppRoute = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={VideoTestContainer} />
      <Route exact path="/video-player" component={VideoPlayerContainer} />
      <Route
        exact
        path="/custom-video-player"
        component={VideoExampleContainer}
      />
      <Route
        exact
        path="/manual-video-player"
        component={ManualPlayerContainer}
      />
      <Route exact path="/google-maps" component={GoogleMapsContainer} />
      <Route exact path="/mobile-otp" component={MobileOtpContainer} />
      <Route path="/*" component={() => <div>invalid Route</div>} />
    </Switch>
  </BrowserRouter>
);

export default AppRoute;
