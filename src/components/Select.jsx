import { forwardRef } from "react";
import SelectComponent from "react-select";

function Select({ label, error, ...rest }, ref) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={rest.id} className="text-lg font-bold">
        {label}
      </label>
      <SelectComponent
        ref={ref}
        styles={{
          control: () => ({
            display: "flex",
            borderWidth: 1,
            borderColor: "#122558",
            borderRadius: 4,
            backgroundColor: "white",
            minWidth: 150,
          }),
        }}
        {...rest}
      />
      {!!error && (
        <span className="text-red-500 font-semibold mt-2">{error}</span>
      )}
    </div>
  );
}

export default forwardRef(Select);
