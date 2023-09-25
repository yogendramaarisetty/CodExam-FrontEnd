import React, { useState } from "react";

const DarkModeToggle = ({ onChange, toggleText }) => {
  return <button onClick={onChange}>{toggleText}</button>;
};

export default DarkModeToggle;
