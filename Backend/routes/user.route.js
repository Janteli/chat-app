import express from 'express'
import { allUser, login, logout, signup } from '../controller/user.controller.js';
import secureRoute from '../middleware/secureRoute.js';

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/signout", logout)
router.get("/allusers",secureRoute, allUser)

export default router;