import { bookController } from "@/controllers/book.controller";
import { Router } from "express";

const router = Router();

router.get("/", bookController.getAll);
router.get("/:id", bookController.getById);

router.post("/", bookController.create);

router.put("/:id", bookController.update);

router.delete("/:id", bookController.delete);

export default router;
