import LoginPage from "./LoginPage";

function Page() {
  return (
    <div className="flex-1 flex justify-center pt-4 pb-4  w-full bg-hero-pattern bg-cover bg-no-repeat">
      <div className="rounded-lg flex flex-col bg-white/35 shadow-2xl">
        <h1 className="font-serif pt-8 text-azul-toledo text-center text-[46px]">
          Login
        </h1>
        <LoginPage />
      </div>
    </div>
  );
}

export default Page;
