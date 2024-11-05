function Delivered() {
  return (
    <div className="rounded-lg flex flex-col bg-white/35 shadow-2xl">
      <h1 className="font-serif pt-8 text-azul-toledo text-center text-[46px]">
        Entrega de Headsets
      </h1>
      <div>
        <div className="flex-1 flex justify-between">
          <div className="flex-1 flex flex-col items-center justify-center gap-2 p-4">
            <h1>Data da Entrega:</h1>
            <div className="flex">
              <div className="flex flex-col items-center justify-center gap-2 p-4">
                <input
                  className="bg-blue-200 w-full border border-azul-toledo rounded-md outline-none p-1 placeholder:text-azul-toledo"
                  type="date"
                />
                <input
                  className="bg-blue-200 border border-azul-toledo rounded-md outline-none p-1 placeholder:text-azul-toledo"
                  type="text"
                  placeholder="Usuário"
                />
                <select
                  className="bg-blue-200 border w-full border-azul-toledo rounded-md outline-none p-1 placeholder:text-azul-toledo"
                  type=""
                  placeholder="Filial"
                >
                  <option value="matriz">Matriz</option>
                  <option value="aguapei">Aguapeí</option>
                  <option value="aviacao">Aviação</option>
                  <option value="marechal">Marechal</option>
                  <option value="saverio">Savério</option>
                </select>
              </div>
              <h1>teste</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Delivered;
