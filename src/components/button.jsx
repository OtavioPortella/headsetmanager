import { twMerge } from "tailwind-merge";

function Button({ children, type, className, disabled, ...rest }) {
  return (
    <button
      className={twMerge(
        "bg-azul-toledo disabled:bg-slate-300 disabled:text-slate-500 font-semibold px-4 py-1 text-white rounded-md hover:bg-slate-300 hover:text-azul-toledo hover:border hover:border-azul-toledo",
        className,
      )}
      disabled={disabled}
      type={type ?? "button"}
      {...rest}
    >
      {children}
    </button>
  );
}
export default Button;
