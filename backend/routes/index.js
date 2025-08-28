import express from 'express';
import { verifyToken } from '../JWTmiddleware.js';
import {viewUsers} from '../controllers/adminController.js';

const router = express.Router();

router.get('/users',verifyToken, viewUsers);

export default router;