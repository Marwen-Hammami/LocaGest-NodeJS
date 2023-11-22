

import { Router } from 'express';

// Import the Reservation controller
import { addDistribution, getAllDistributions, getDistributionById, deleteDistribution } from '../controllers/distribution.js';

const router = Router();

router.post("/addDistribution", addDistribution);
router.get("/getAllDistributions", getAllDistributions);

router.get("/getDistributionById/:distributions_id", getDistributionById);
router.delete("/deleteDistribution/:distributions_id", deleteDistribution);



export default router;
