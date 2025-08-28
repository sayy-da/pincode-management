import express from 'express';
import { register, login, home, pincode } from '../controllers/userController.js';
import { verifyToken } from '../JWTmiddleware.js';
const router = express.Router();

router.get('/pincode/:pincode',pincode)
router.post('/register', register);
router.post('/login', login);
router.get('/home', verifyToken,home);

export default router;