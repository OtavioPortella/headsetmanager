import { twMerge } from "tailwind-merge";

function Container({ children, className }) {
  return (
    <div
      className={twMerge(
        "bg-white min-h-full rounded-lg p-4 flex flex-col",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Container;
