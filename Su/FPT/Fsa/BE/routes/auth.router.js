const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Đăng nhập
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Đăng ký tài khoản mới
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               fullName:
 *                 type: string
 *               identifyNumber:
 *                 type: string
 *               age:
 *                 type: integer
 *               address:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               role:
 *                 type: string
 *             required:
 *               - userid
 *               - username
 *               - password
 *               - email
 *               - phoneNumber
 *               - fullName
 *               - identifyNumber
 *               - age
 *               - address
 *               - dateOfBirth
 *               - role
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/auth/verify/{token}:
 *   get:
 *     summary: Xác thực tài khoản
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token xác thực tài khoản
 */
router.get('/verify/:token', authController.verifyAccount);

module.exports = router;