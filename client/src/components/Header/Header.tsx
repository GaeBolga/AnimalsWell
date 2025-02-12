import { Link } from "react-router-dom";
import "./Header.css";
import { useState } from "react";

function Header() {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnexion = () => {
    setIsConnected(!isConnected);
  };

  return (
    <main className="header-container">
      <img
        className="nav-img"
        src="./src/assets/images/paw.png"
        alt="logo patte de chat"
      />
      {isConnected ? (
        <p>Bienvenue !</p>
      ) : (
        <div className="link-container">
          <Link className="black-text react-link" to="/inscription">
            inscription
          </Link>
          <button
            className="black-text connexion-button "
            type="button"
            onClick={handleConnexion}
          >
            connexion
          </button>
        </div>
      )}
    </main>
  );
}
export default Header;
