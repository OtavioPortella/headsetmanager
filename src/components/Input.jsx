import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

function Input({ className, label, error, ...rest }, ref) {
  return (
    <div>
      <label className="flex flex-col gap-1">
        <span className="text-lg font-bold">{label}</span>
        <input
          className={twMerge(
            "border border-azul-toledo rounded outline-none p-1 placeholder:text-zinc-500",
            className,
          )}
          {...rest}
          ref={ref}
        />
      </label>
      {!!error && (
        <span className="text-red-500 font-semibold mt-2">{error}</span>
      )}
    </div>
  );
}

export default forwardRef(Input);
