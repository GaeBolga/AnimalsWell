import { useState } from "react";
import "./Inscription.css";
import { useNavigate } from "react-router-dom";
import useToast from "../useToast";

function inscription() {
  const navigate = useNavigate();
  const { success, failed } = useToast();

  const [formData, setFormData] = useState({
    pseudo: "",
    mail: "",
    mdp: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/inscription`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pseudo: formData.pseudo,
            mail: formData.mail,
            mdp: formData.mdp,
          }),
        },
      );
      if (response.ok) {
        success("bonjour");
        navigate("/");
      } else {
        failed("Échec de la validation. Veuillez réessayer.");
      }
    } catch (error) {
      failed("Une erreur est survenue.");
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="background inscription-container">
      <h1>Inscription</h1>
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
            mail
            <input
              type="text"
              name="mail"
              value={formData.mail}
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
    </main>
  );
}

export default inscription;
// pseudo mail mot de passe
