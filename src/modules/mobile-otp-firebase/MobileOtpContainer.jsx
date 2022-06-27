import React, { useState } from "react";
import firebase from "../../firebase";

import MobileOtp from "./MobileOtp";

const MobileOtpContainer = () => {
  const [mobileNo, setMobileNo] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    error: null,
  });

  const onInputChange = (e) => {
    setMobileNo(e.target.value);
  };

  const handleInput = (e, key) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  const handleClick = () => {
    let recapcha = new firebase.auth.RecaptchaVerifier("recaptcha");
    //let number = "+919265893243";
    firebase
      .auth()
      .signInWithPhoneNumber(mobileNo, recapcha)
      .then((e) => {
        let code = prompt("Enter the otp", "");
        if (code === null) return;
        e.confirm(code)
          .then((res) => {
            console.log(">>>user", res.user.phoneNumber);
            document.querySelector("label").textContent =
              res.user.phoneNumber + "Number Verfied";
          })
          .catch((err) => {
            console.log(err);
            document.querySelector("label").textContent = "Invalid otp";
          });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(">>>e", formData);
    firebase
      .auth()
      .createUserWithEmailAndPassword(formData.email, formData.password)
      .then((user) => {
        console.log(">>>", user);
      })
      .catch((error) => {
        setFormData({ ...formData, [error]: error });
      });
  };

  return (
    <MobileOtp
      handleClick={handleClick}
      mobileNo={mobileNo}
      onInputChange={onInputChange}
      handleInput={handleInput}
      formData={formData}
      handleSubmit={handleSubmit}
    />
  );
};

export default MobileOtpContainer;
