import "./Home.css";

function Home() {
  return (
    <main className="home-container ">
      <section className="home-section-container home-flex">
        <figcaption>
          <img
            className="mascotte"
            src="./src/assets/images/cat.png"
            alt="Un adorable chat roux"
          />
        </figcaption>
        <div className="bloc-text-home">
          <h2 className="black-text center-text">
            Bienvenue sur AnimalWell : un carnet de santé numérique pour vos
            animaux{" "}
          </h2>
          <p className="black-text center-text p-home">
            AnimalWell est un site conçu pour permettre aux propriétaires
            d'animaux de suivre la santé et le bien-être de leurs compagnons à
            quatre pattes. Grâce à notre interface simple et intuitive, vous
            pourrez créer un carnet de santé virtuel pour chaque animal, y
            inscrire ses informations essentielles, et garder une trace de ses
            visites vétérinaires, vaccins, traitements et autres événements
            importants. Ce site est une solution pratique pour ceux qui
            souhaitent avoir toutes les données médicales de leurs animaux à
            portée de main, à tout moment.
          </p>
        </div>
      </section>

      <section className="home-section-container home-flex">
        <div className="bloc-text-home ">
          <h2 className="black-text center-text">
            Gérez facilement les informations de vos animaux grâce à notre
            système sécurisé
          </h2>
          <p className="black-text center-text p-home">
            Avec AnimalWell, vous pouvez vous connecter en toute sécurité et
            accéder à votre tableau de bord personnel. En quelques clics, vous
            pourrez ajouter, modifier ou supprimer des fiches pour chaque
            animal, consulter l’historique des soins ou encore suivre les
            rappels de vaccination. Que vous soyez vétérinaire ou simple
            propriétaire, cette plateforme vous aide à maintenir un suivi précis
            et organisé pour chaque animal, tout en garantissant la
            confidentialité et la sécurité des données.
          </p>
        </div>
        <figcaption>
          <img
            className="mascotte"
            src="./src/assets/images/dog.png"
            alt="Un féroce chien roux bondissant sauvagement dans le vide"
          />
        </figcaption>
      </section>
    </main>
  );
}

export default Home;
