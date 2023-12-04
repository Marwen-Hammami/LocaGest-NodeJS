

import { Router } from 'express';
import multer from 'multer';

// Import the Reservation controller
import { addTool, getAllTools, getToolById, deleteTool,updatetool,updatetoolNoimaga } from '../controllers/tools.js';
const router = Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    }
  });
var upload = multer({ storage: storage });


router.post("/addTool/:name/:stock/:price/:marque/:type",upload.single('image'), addTool);
router.get("/getAllTools", getAllTools);

router.get("/Contactbyid/:tools_id", getToolById);
router.delete("/deleteTool/:id", deleteTool);
router.put("/updateTool/:id/:name/:stock/:price/:marque/:type",upload.single('image'), updatetool);
router.put("/updateToolno/:id/:name/:stock/:price/:marque/:type", updatetoolNoimaga);





export default router;
