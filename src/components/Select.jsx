import { forwardRef } from "react";
import SelectComponent from "react-select";

function Select({ ...rest }, ref) {
  return (
    <SelectComponent
      ref={ref}
      styles={{
        control: () => ({
          display: "flex",
          borderWidth: 1,
          borderColor: "#122558",
          borderRadius: 4,
          backgroundColor: "white",
        }),
      }}
      {...rest}
    />
  );
}

export default forwardRef(Select);
