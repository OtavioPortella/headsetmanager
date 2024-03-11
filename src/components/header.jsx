import Button from "./button";

function Header() {
  return (
    <header className="bg-azul-toledo text-white h-16">
      <div className="flex justify-between p-4">
        <div className="flex justify-center h-8">
          <img src="../src/assets/toledo.png" alt="" />
        </div>
        <Button>Login</Button>
      </div>
    </header>
  );
}

export default Header;
