

import { Router } from 'express';

// Import the Reservation controller
import { addTool, getAllTools, getToolById, deleteTool } from '../controllers/tools.js';
const router = Router();

router.post("/addTool", addTool);
router.get("/getAllTools", getAllTools);

router.get("/Contactbyid/:tools_id", getToolById);
router.delete("/deleteTool/:tools_id", deleteTool);



export default router;
