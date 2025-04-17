import express from 'express';
import { register } from '../controllers/register.js';
import { login } from '../controllers/login.js';
import { verifyAuth } from "../controllers/verifyAuth.js";
import { logout } from "../controllers/logout.js";
import { updateProfile } from '../controllers/updateProfile.js';
import { applyProfileChanges } from '../controllers/updateProfile.js';
import { accountData, preferCurrenciesData } from '../controllers/accountData.js';
import { userProfileData } from '../controllers/accountData.js';
import { lastMovementsData } from '../controllers/accountData.js'
import { balanceData } from '../controllers/balanceData.js'
import { savingsStatsController } from "../controllers/savingsData.js";
import { movementsReport } from '../controllers/getAllMovements.js';

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

router.get("/cashflow/api/verify-auth", verifyAuth);
router.post("/cashflow/api/logout", logout);

router.post('/cashflow/api/login', login);
router.post('/cashflow/api/register', register);

router.post('/cashflow/api/completed-profile', updateProfile);
router.post('/cashflow/api/acc_data', accountData);
router.post("/cashflow/api/last_movs", lastMovementsData);
router.post("/cashflow/api/update_profile", applyProfileChanges);
router.post("/cashflow/api/update_balance", balanceData);
router.post("/cashflow/api/savings_stats", savingsStatsController);
router.post("/cashflow/api/all_movs", movementsReport);

router.get("/cashflow/api/profile/:UID", userProfileData)
router.get("/cashflow/api/ucurrencies/:UID", preferCurrenciesData)

export default router;