import express from "express";

const router = express.Router();
router.use(express.json());

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";
import userActions from "./modules/user/userActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);
router.post("/user/inscription", userActions.inscription);
router.post("/user/connexion", userActions.connexion);
/* ************************************************************************* */

export default router;
