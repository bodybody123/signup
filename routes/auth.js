import express from 'express'
import authCtrl from '../controllers/auth.js';
const router = express.Router();

//Make a connection to pages
router.post('/register', authCtrl.register);

router.post('/login', authCtrl.login);

export default router;