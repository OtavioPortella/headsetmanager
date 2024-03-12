import Button from "./button";

function Header() {
  return (
    <header className="bg-azul-toledo text-white h-16">
      <div className="flex justify-between p-4">
        <div className="flex justify-center h-8">
          <img href="./login" src="../src/assets/toledo.png" alt="" />
        </div>
        <Button>
          <a href="./teste1">Teste1</a>
        </Button>
        <Button>
          <a href="./teste2">Teste2</a>
        </Button>
      </div>
    </header>
  );
}

export default Header;
