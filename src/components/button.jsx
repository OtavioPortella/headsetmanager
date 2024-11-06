import { twMerge } from "tailwind-merge";

function Button({ children, type, className, ...rest }) {
  return (
    <button
      className={twMerge(
        "bg-azul-toledo font-semibold px-4 py-1 text-white rounded-md hover:bg-slate-300 hover:text-azul-toledo hover:border hover:border-azul-toledo",
        className,
      )}
      type={type ?? "button"}
      {...rest}
    >
      {children}
    </button>
  );
}
export default Button;
