import Button from "../components/button";

function Teste1() {
  return (
    <div className="flex-1 flex justify-center pt-4 pb-4  w-full bg-hero-pattern bg-cover bg-no-repeat">
      <div className="rounded-lg flex flex-col bg-white/35 shadow-2xl">
        <h1 className="font-serif pt-8 text-azul-toledo text-center text-[46px]">
          Heads Recebidos
        </h1>
        <div className=" w-screen">
          <div className="flex flex-col items-center gap-4">
            <input
              className="bg-blue-200 border border-azul-toledo rounded-md outline-none p-1 placeholder:text-azul-toledo"
              type="date"
              placeholder=""
            />
            <input
              className="bg-blue-200 border border-azul-toledo rounded-md outline-none p-1 placeholder:text-azul-toledo"
              type="number"
              placeholder="Quantidade"
            />
            <label> Selecione a Filial:</label>
            <select
              className="bg-blue-200 border border-azul-toledo rounded-md outline-none p-1 placeholder:text-azul-toledo"
              type="password"
              placeholder="Filial"
            >
              <option value="matriz">Matriz</option>
              <option value="aguapei">Aguapeí</option>
              <option value="aviacao">Aviação</option>
              <option value="marechal">Marechal</option>
              <option value="saverio">Savério</option>
            </select>

            <Button>Entrar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teste1;
