import { useNavigate } from "react-router-dom";
import "./Ajout.css";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import useToast from "../useToast";

function Ajout() {
  const navigate = useNavigate();

  const { success, failed } = useToast();
  const { user } = useUser();

  useEffect(() => {
    if (!user) navigate("/");
  }, [navigate, user]);

  if (user) {
    const animal = [
      {
        chien: {
          imagePath: "./src/assets/images/chiencarte-removebg-preview.png",
          race: "chien",
        },
        chat: {
          imagePath: "./src/assets/images/chatcarte-removebg-preview.png",
          race: "chat",
        },
        inconnu: {
          imagePath: "./src/assets/images/crabby.png",
          race: "?????",
        },
      },
    ];

    const [formData, setFormData] = useState({
      name: "",
      age: "",
      poids: "",
      commentaire: "",
      vaccin: false,
      vaccin_date: "",
      img_path: "",
      user_id: user.id,
      espece: "",
      race: "",
    });

    const animalsArray = Object.entries(animal[0]);
    const [form, setForm] = useState(true);
    const handleSelection = (race: string, img_path: string) => {
      setFormData((prev) => ({
        ...prev,
        race: race,
        img_path: img_path,
      }));

      setForm(!form);
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/animals/ajout`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formData.name,
              age: formData.age,
              poids: formData.poids,
              commentaire: formData.commentaire,
              vaccin: formData.vaccin,
              vaccin_date: formData.vaccin_date,
              img_path: formData.img_path,
              espece: formData.espece,
              race: formData.race,
              user_id: formData.user_id,
            }),
          },
        );
        if (response.ok) {
          success("Votre carnet de santé a été mis à jour :");
          setFormData({
            name: "",
            age: "",
            poids: "",
            commentaire: "",
            vaccin: false,
            vaccin_date: "",
            img_path: "",
            user_id: "",
            espece: "",
            race: "",
          });
          setForm(!form);
        } else {
          failed(
            "Échec de la mise à jour du carnet de santé. Veuillez réessayer.",
          );
        }
      } catch (error) {
        failed("Une erreur est survenue.");
      }
    }

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      const target = e.target as HTMLInputElement;

      setFormData({
        ...formData,
        [target.name]:
          target.type === "checkbox" ? target.checked : target.value,
      });
    };
    return (
      <main className="carnet-container">
        <button
          className="button"
          type="button"
          onClick={() => navigate("/carnet")}
        >
          retour
        </button>

        {form ? (
          <>
            <h1>Choisissez votre animal</h1>
            <div className="card-container">
              {animalsArray.map(([key, value]) => (
                <div key={key} className="choice-card">
                  <button
                    className="card-button"
                    type="button"
                    onClick={() => handleSelection(value.race, value.imagePath)}
                  >
                    <img
                      className="img-choice"
                      src={`${value.imagePath}`}
                      alt={value.imagePath}
                    />
                  </button>
                  <p>{value.race}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>
            <h1>formlaire</h1>
            <button type="button" onClick={() => console.log(formData)}>
              click
            </button>
            <section className="card-container">
              <form
                className="card-color"
                action="submit"
                onSubmit={handleSubmit}
              >
                <div className="choice-card-container">
                  <section className="first-part-choice">
                    <img
                      src={formData.img_path}
                      alt="Votre animal de compagnie !"
                    />
                    <div className="first-input">
                      <label>
                        Nom
                        <input
                          className="input-style"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </label>{" "}
                      <label>
                        <br /> age
                        <input
                          className="input-style"
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                        />
                      </label>{" "}
                      <div>
                        <label>
                          poids
                          <input
                            className="input-style"
                            type="text"
                            name="poids"
                            value={formData.poids}
                            onChange={handleChange}
                          />
                        </label>{" "}
                        <label>
                          <br />
                          espece
                          <input
                            className="input-style"
                            type="text"
                            name="espece"
                            value={formData.espece}
                            onChange={handleChange}
                          />
                        </label>{" "}
                      </div>
                    </div>
                  </section>
                  <section>
                    <label>
                      <label>
                        vaccins à jour
                        <input
                          className="input-style"
                          type="checkbox"
                          name="vaccin"
                          checked={formData.vaccin === true}
                          onChange={handleChange}
                        />
                      </label>{" "}
                      <input
                        className="input-style"
                        type="date"
                        name="vaccin_date"
                        value={formData.vaccin_date}
                        onChange={handleChange}
                      />
                    </label>{" "}
                    <div>
                      <label>
                        commentaire
                        <input
                          className="input-style commentary"
                          type="text"
                          name="commentaire"
                          value={formData.commentaire}
                          onChange={handleChange}
                        />
                      </label>{" "}
                    </div>
                  </section>
                  <button type="submit"> valider </button>
                </div>
              </form>
            </section>
          </div>
        )}
      </main>
    );
  }
}

export default Ajout;
