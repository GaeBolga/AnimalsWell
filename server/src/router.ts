import express from "express";

const router = express.Router();
router.use(express.json());

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import animalsActions from "./modules/animals/animalsActions";
import itemActions from "./modules/item/itemActions";
import userActions from "./modules/user/userActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);
router.post("/user/inscription", userActions.inscription);
router.post("/user/connexion", userActions.connexion);
router.post("/animals/ajout", animalsActions.ajout);
router.post("/animals/myanimals", animalsActions.read);
router.delete("/deleteAnimals", animalsActions.deleteAnimals);
/* ************************************************************************* */

export default router;
