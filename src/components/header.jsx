import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "./button";

function Header() {
  const navigate = useNavigate();

  const { signed, logout } = useAuth();

  if (!signed) return null;

  return (
    <header className="bg-azul-toledo text-white h-16">
      <div className="flex justify-between p-4">
        <div className="flex justify-center h-8">
          <img src="../src/assets/toledo.png" alt="" />
        </div>
        <div>
          {signed && (
            <>
              <Link to="/packages">
                <Button>Malotes</Button>
              </Link>
              <Link to="/sections">
                <Button>Carteiras</Button>
              </Link>
              <Button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Sair
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
