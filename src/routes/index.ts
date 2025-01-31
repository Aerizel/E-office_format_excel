import { Router } from "express";
import { uploadExcel } from "../controllers/format_excel.Controller";

const router = Router();

router.post('/FormatExcel', uploadExcel);

export default router;