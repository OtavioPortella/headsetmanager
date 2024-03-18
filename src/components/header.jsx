import Button from "./button";

function Header() {
  return (
    <header className="bg-azul-toledo text-white h-16">
      <div className="flex justify-between p-4">
        <div className="flex justify-center h-8">
          <img src="../src/assets/toledo.png" alt="" />
        </div>
        <div>
          <Button>
            <a href="./">Login</a>
          </Button>
          <Button>
            <a href="./received">Recebidos</a>
          </Button>
          <Button>
            <a href="./send">Enviados</a>
          </Button>
          <Button>
            <a href="./dashboard">Relatórios</a>
          </Button>
          <Button>
            <a href="./delivered">Entrega de Heads</a>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
