import React from "react";
import { TextField, Button, Box } from "@material-ui/core";

const MobileOtp = ({
  handleClick,
  onInputChange,
  mobileNo,
  handleInput,
  handleSubmit,
  formData,
}) => {
  return (
    <>
      <div style={{ display: "inline-grid" }}>
        <label>Enter Your Number with country code</label>
        <input
          name="phoneNo"
          type="text"
          value={mobileNo}
          onChange={onInputChange}
        />
        <label></label>
        <button onClick={handleClick}>Click here</button>
      </div>
      <Box>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            id="margin-normal"
            name="email"
            value={formData.email}
            //className={classes.textField}
            helperText="e.g. name@gmail.com"
            onChange={(e) => handleInput(e, "email")}
          />
          <TextField
            label="Password"
            id="margin-normal"
            name="password"
            value={formData.password}
            //className={classes.textField}
            helperText="Enter Password"
            onChange={(e) => handleInput(e, "password")}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            //className={classes.button}
          >
            Log In
          </Button>
        </form>
      </Box>
      <div id="recaptcha"></div>
    </>
  );
};

export default MobileOtp;
