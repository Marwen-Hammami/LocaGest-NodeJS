import express from 'express';
import { createAdmin, getAdmins, getAdmin, updateAdmin, deleteAdmin } from '../controller/admin.js';

const router = express.Router();

router.post('/', createAdmin);
router.get('/', getAdmins);
router.get('/:id', getAdmin);
router.put('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);

export default router;
