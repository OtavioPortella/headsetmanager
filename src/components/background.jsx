function Background({ children }) {
  return (
    <div className="flex-1 flex justify-center pt-4 pb-4  w-full bg-hero-pattern bg-cover bg-no-repeat">
      {children}
    </div>
  );
}

export default Background;
