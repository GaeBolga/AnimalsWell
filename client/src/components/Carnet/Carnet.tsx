import { useNavigate } from "react-router-dom";
import "./Carnet.css";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import useToast from "../useToast";
type AnimalType = {
  name: string;
  age: number;
  poids: string;
  commentaire: string;
  vaccin: boolean;
  vaccin_date: string;
  img_path: string;
  race: string;
  espece: string;
  id: number;
};

function Carnet() {
  const { success, failed } = useToast();

  const navigate = useNavigate();
  const { user } = useUser();
  const [data, setData] = useState<AnimalType[]>([]);
  useEffect(() => {
    if (!user) navigate("/");
    else {
      animalsCarnet();
    }
  }, [navigate, user]);

  const animalsCarnet = async () => {
    if (user) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/animals/myanimals`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: user.id,
            }),
          },
        );
        const data = await response.json();
        const animalsArray = Array.isArray(data.carnet)
          ? data.carnet
          : [data.carnet];
        setData(animalsArray);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  const deleteAnimal = async (animalId: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/deleteAnimals`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            animalId: animalId,
          }),
        },
      );
      if (response.ok) {
        success("Votre carnet de santé a été mis à jour :");
        animalsCarnet();
      } else {
        failed(
          "Échec de la mise à jour du carnet de santé. Veuillez réessayer.",
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <main className="carnet-container">
      <button
        className="new-animal"
        type="button"
        onClick={() => navigate("/ajout")}
      >
        {" "}
        renseigner un animal{" "}
      </button>
      <h1 className="black-text">Vos animaux :</h1>
      <section className="card-container ">
        {data.map((animal) => (
          <div key={animal.vaccin_date} className="card">
            <section className=" first-part">
              <img
                className="animal-image"
                src={animal.img_path}
                alt={animal.race}
              />
              <div className="presentation-container">
                <p className="black-text"> {animal.name}</p>
                <p className="black-text">{animal.age} ans</p>
                <p className="black-text">{animal.poids} kg</p>
              </div>
              <button
                className="close-button"
                type="button"
                onClick={() => deleteAnimal(animal.id)}
              >
                {" "}
                X{" "}
              </button>
            </section>
            <section className="second-part flex">
              <div className="vaccination-container">
                <p className="black-text">Vaccin : {animal.vaccin}</p>
                <p className="black-text">
                  prochain vaccin le : {animal.vaccin_date.slice(0, 10)}
                </p>
              </div>
              <div className="commentaire-container">{animal.commentaire}</div>
            </section>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Carnet;
