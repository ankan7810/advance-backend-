import { Router } from "express";
import Authcontroller from "../controllers/auth.controllers.js";
import authMiddleware from "../middlewares/Authenticate.js";
import ProfileController from "../controllers/profile.controllers.js";
import NewsController from "../controllers/News.controllers.js";
import redisCache from "../DB/redis.config.js";

const router=Router()

router.post("/auth/register",Authcontroller.register)
router.post("/auth/login",Authcontroller.login)
router.get("/send-email",Authcontroller.sendTestEmail)

router.get("/profile",authMiddleware,ProfileController.index)//private route
router.put("/profile/:id",authMiddleware,ProfileController.update)

router.get("/news", redisCache.route({expire:60*30}),NewsController.index)
router.post("/news", authMiddleware,NewsController.store)
router.get("/news/:id", authMiddleware,NewsController.show)
router.put("/news/:id", authMiddleware,NewsController.update)
router.delete("/news/:id", authMiddleware,NewsController.destroy)

export default router