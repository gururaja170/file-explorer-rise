import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Dropdown = ({ id, label, width, value, onChange, options, required }) => {
  return (
    <FormControl
      sx={{ width }}
      size="small"
      required={required}
      variant="outlined"
    >
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        MenuProps={{ PaperProps: { sx: { maxHeight: 250, maxWidth: 300 } } }}
        labelId={id}
        id={`select-${id}`}
        name={id}
        value={value}
        label={label}
        onChange={onChange}
        sx={{ maxHeight: "300px" }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
