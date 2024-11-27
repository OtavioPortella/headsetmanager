import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

const buttonVariants = tv({
  base: "disabled:bg-slate-300 disabled:text-slate-500 font-semibold px-4 py-1 text-white rounded-md transition-colors duration-200",
  variants: {
    color: {
      primary: "bg-azul-toledo hover:bg-azul-toledo/90",
      danger: "bg-red-700 hover:bg-red-500 text-white",
      success: "bg-green-700 hover:bg-green-800",
    },
  },
});

function Button({
  children,
  type,
  className,
  disabled,
  color = "primary",
  ...rest
}) {
  return (
    <button
      className={twMerge(
        buttonVariants({
          color,
        }),
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
