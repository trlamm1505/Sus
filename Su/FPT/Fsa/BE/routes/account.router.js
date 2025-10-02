const express = require('express');
const router = express.Router();
const { getAllAccounts, deleteAccount, updateAccount } = require('../controllers/account.controller');

const { verifyToken, authorizeRole } = require('../middlewares/auth.middleware');

// chỉ admin mới được lấy danh sách account
// ...existing code...

// ...existing code...

/**
 * @swagger
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       properties:
 *         userid:
 *           type: string
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         email:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         fullName:
 *           type: string
 *         identifyNumber:
 *           type: string
 *         age:
 *           type: integer
 *         address:
 *           type: string
 *         dateOfBirth:
 *           type: string
 *           format: date
 *         role:
 *           type: string
 */

// ...existing code...

/**
 * @swagger
 * /api/admin/accounts/get-all-accounts:
 *   get:
 *     summary: Lấy danh sách tất cả account
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Account'
 */
router.get('/get-all-accounts', verifyToken, authorizeRole('admin'), getAllAccounts);

/**
 * @swagger
 * /api/admin/accounts/delete-account:
 *   put:
 *     summary: Xóa account
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
router.put('/delete-account', verifyToken, authorizeRole('admin'), deleteAccount);

/**
 * @swagger
 * /api/admin/accounts/update-account/{userid}:
 *   put:
 *     summary: Cập nhật account
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Account'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put('/update-account/:userid', verifyToken, authorizeRole('admin'), updateAccount);

// ...existing code...


module.exports = router;
