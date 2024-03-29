function Button({ children }) {
  return (
    <button
      className="bg-azul-toledo font-semibold px-4 py-1 text-white rounded-md hover:bg-slate-300 hover:text-azul-toledo hover:border hover:border-azul-toledo"
      type="button"
    >
      {children}
    </button>
  );
}
export default Button;
