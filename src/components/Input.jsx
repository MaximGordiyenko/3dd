import { TextField } from "@mui/material";

export const Input = ({ value, onChange }) => {
  return (
    <TextField
      id="standard-basic"
      label="Products"
      variant="standard"
      type="text"
      name="products"
      placeholder="Lorem impus"
      value={value}
      onChange={onChange}
    />
  );
};
