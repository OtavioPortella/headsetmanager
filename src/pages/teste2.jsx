import Button from "../components/button";

function Teste2() {
  return (
    <div className="flex-1 flex justify-center pt-4 pb-4  w-full bg-hero-pattern bg-cover bg-no-repeat">
      <div className="rounded-lg flex flex-col bg-white/35 shadow-2xl">
        <h1 className="font-serif pt-8 text-azul-toledo text-center text-[46px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          delectus rerum, repudiandae distinctio consectetur sint voluptatibus
          ex reprehenderit blanditiis dolorum a? Quaerat exercitationem repellat
          placeat facere, repudiandae earum minima accusamus.
        </h1>
        <div className="flex-1 flex justify-between">
          <div className=" flex-1 flex flex-col justify-center items-center gap-4">
            <input
              className="bg-blue-200 border border-azul-toledo rounded-md outline-none p-1 placeholder:text-azul-toledo"
              type="text"
              placeholder="Usuário"
            />
            <input
              className="bg-blue-200 border border-azul-toledo rounded-md outline-none p-1 placeholder:text-azul-toledo"
              type="password"
              placeholder="Senha"
            />
            <Button>Entrar</Button>
          </div>
          <div className="flex-1 w-[700px] bg-forgot-password bg-contain bg-no-repeat" />
        </div>
      </div>
    </div>
  );
}

export default Teste2;
