import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useState } from "react";
import { useUser } from "../../context/UserContext";
import useToast from "../useToast";

function Header() {
  const { setUser } = useUser();

  const [formData, setFormData] = useState({
    pseudo: "",
    mdp: "",
  });

  const { success, failed } = useToast();

  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/connexion`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pseudo: formData.pseudo,
            mdp: formData.mdp,
          }),
        },
      );
      const data = await response.json();
      if (!response) {
        failed("Échec de la validation. Veuillez vérifier vos identifiants.");
      } else {
        success("bonjour");
        setIsConnected(!isConnected);
        setUser({
          pseudo: data.user.pseudo,
          id: data.user.id,
        });

        setIsOpen(!isOpen);
      }
    } catch (error) {
      failed("Une erreur est survenue.");
    }
  }

  return (
    <main className="header-container ">
      <button
        className="connexion-button"
        type="button"
        onClick={() => navigate("/")}
      >
        <img
          className="nav-img"
          src="./src/assets/images/paw.png"
          alt="logo patte de chat"
        />
      </button>
      {isConnected ? (
        <div>
          <p className="black-text">Bienvenue !</p>
          <Link className="black-text react-link" to="/carnet">
            carnet
          </Link>
        </div>
      ) : (
        <div className="link-container">
          <Link className="black-text react-link" to="/inscription">
            inscription
          </Link>
          <button
            className="black-text connexion-button "
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            connexion
          </button>
        </div>
      )}
      {isOpen && (
        <div>
          <h1>Inscription</h1>
          <button type="button" onClick={() => setIsOpen(!isOpen)}>
            X
          </button>
          <form action="submit" onSubmit={handleSubmit}>
            <section>
              <label>
                Pseudo
                <input
                  type="text"
                  name="pseudo"
                  value={formData.pseudo}
                  onChange={handleChange}
                />
              </label>{" "}
              <label>
                mot-de-passe
                <input
                  type="text"
                  name="mdp"
                  value={formData.mdp}
                  onChange={handleChange}
                />
              </label>{" "}
              <button type="submit">Envoyer</button>
            </section>
          </form>
        </div>
      )}
    </main>
  );
}
export default Header;
