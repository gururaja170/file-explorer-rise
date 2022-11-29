import React from "react";
import TextField from "@mui/material/TextField";

const Input = ({ id, label, type = "text", value, onChange, ...rest }) => {
  return (
    <TextField
      id={id}
      name={id}
      label={label}
      variant="outlined"
      size="small"
      type={type}
      value={value}
      onChange={onChange}
      fullWidth
      {...rest}
    />
  );
};

export default Input;
