import express from 'express';
import { register } from '../controllers/register.js';
import { login } from '../controllers/login.js';
import { verifyAuth } from "../controllers/verifyAuth.js";
import { logout } from "../controllers/logout.js";
import { updateProfile } from '../controllers/updateProfile.js';
import { accountData } from '../controllers/accountData.js';

const router = express.Router();

// Main Route - /cashflow/api
router.get('/cashflow/api', (req, res) => {
  res.send(`
    <div style="display: flex; justify-content: center; align-items: center; height: 90dvh;">
      <span style="color: #ffd049bf; font-weight: bold; font-family: 'Arial'; background-color: #334051; padding: 4rem; border-radius: 1rem;">
        Welcome to Cashflow API 💰!
      </span>
    </div>
    `);
});

router.post('/cashflow/api/register', register);
router.post('/cashflow/api/login', login);
router.post('/cashflow/api/completed-profile', updateProfile);
router.post('/cashflow/api/acc_data', accountData);
router.get("/cashflow/api/verify-auth", verifyAuth);
router.post("/cashflow/api/logout", logout);


export default router;