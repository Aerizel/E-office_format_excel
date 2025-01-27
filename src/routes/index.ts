import { Router } from "express";
import { uploadExcel } from "../controllers/FormatExcel.Controller";

const router = Router();

router.post('/FormatExcel', uploadExcel);

export default router;