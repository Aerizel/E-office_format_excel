import { Router } from "express";
import { uploadExcelFromApi, uploadExcelFromFront } from "../controllers/format_excel.Controller";

const router = Router();

router.post('/FormatExcel', uploadExcelFromFront);
router.post('/api/FormatExcel', uploadExcelFromApi);

export default router;