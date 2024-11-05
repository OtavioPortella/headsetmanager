function Background({ children }) {
  return (
    <div className="flex-1 flex py-4 w-full bg-hero-pattern bg-cover bg-no-repeat">
      <div className="container mx-auto">
      {children}
      </div>
    </div>
  );
}

export default Background;
