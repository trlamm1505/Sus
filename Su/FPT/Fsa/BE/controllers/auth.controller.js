const AccountModel = require('../models/account.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const emailSender = require('../helpers/email.sender');
const getHTMLRegisterComfirm = require('../public/register_comfirm');
const getHTMLForgotPassword = require('../public/forgot_password');

// ----------------- Controller -----------------
module.exports = {

  // ----------------- Đăng ký -----------------
  register: async (req, res) => {
    try {
      const { username, email, password, phoneNumber, fullName, identifyNumber, age, address, dateOfBirth, role } = req.body;

      // Kiểm tra trùng username
      const existing = await AccountModel.findOne({ username });
      if (existing) return res.status(409).json({ message: 'Username already exists' });

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Tự động tạo userid dạng User1, User2, ...
      const lastAccount = await AccountModel.findOne({}).sort({ createdAt: -1 }).exec();
      let newUserId = 'User1';
      if (lastAccount && lastAccount.userid) {
        const lastNumber = parseInt(lastAccount.userid.replace('User', '')) || 0;
        newUserId = 'User' + (lastNumber + 1);
      }

      // Tạo account mới
      const newAccount = await AccountModel.create({
        userid: newUserId,
        username,
        email,
        password: hashedPassword,
        phoneNumber,
        fullName,
        identifyNumber,
        age,
        address,
        dateOfBirth,
        role,
        isActive: false
      });

      // Tạo token xác thực
      const token = jwt.sign({ userId: newAccount._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      const verifyLink = `http://localhost:5000/api/auth/verify/${token}`;

      // Gửi email xác thực
      await emailSender({
        email: newAccount.email,
        subject: 'Welcome to Our Service',
        html: getHTMLRegisterComfirm({ name: newAccount.username, link: verifyLink })
      });

      return res.status(201).json({
        message: 'Account registered successfully. Please check your email to activate.',
        account: newAccount
      });

    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  },

  // ----------------- Xác thực tài khoản -----------------
  verifyAccount: async (req, res) => {
    try {
      const { token } = req.params;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const account = await AccountModel.findById(decoded.userId);
      if (!account) return res.status(400).send('Không tìm thấy tài khoản');

      account.isActive = true;
      await account.save();

      res.send('Tài khoản đã được kích hoạt thành công!');
    } catch (err) {
      console.error(err);
      res.status(400).send('Token không hợp lệ hoặc đã hết hạn');
    }
  },

  // ----------------- Đăng nhập -----------------
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const account = await AccountModel.findOne({ username });
      if (!account) return res.status(401).json({ message: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, account.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

      if (!account.isActive) return res.status(403).json({ message: 'Account is not active. Please check your email.' });

      const token = jwt.sign({ userId: account._id, role: account.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ message: 'Login successful', token });

    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  },

  // ----------------- Quên mật khẩu -----------------
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const account = await AccountModel.findOne({ email });
      if (!account) return res.status(400).json({ message: 'Email không tồn tại' });

      const token = jwt.sign({ userId: account._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
      const link = `http://localhost:5000/api/auth/reset-password/${token}`;

      await emailSender({
        email: account.email,
        subject: 'Đặt lại mật khẩu',
        html: getHTMLForgotPassword({ name: account.username, link })
      });

      res.json({ message: 'Đã gửi mail đặt lại mật khẩu' });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Lỗi server' });
    }
  },

  // ----------------- Đặt lại mật khẩu -----------------
  resetPassword: async (req, res) => {
    try {
      const { token } = req.params;
      const { newPassword } = req.body;

      if (!newPassword || newPassword.length < 6) return res.status(400).json({ message: 'Mật khẩu mới không hợp lệ' });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const account = await AccountModel.findById(decoded.userId);
      if (!account) return res.status(400).json({ message: 'Token không hợp lệ' });

      const hashed = await bcrypt.hash(newPassword, 10);
      account.password = hashed;
      await account.save();

      res.json({ message: 'Đặt lại mật khẩu thành công' });

    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Token không hợp lệ hoặc hết hạn' });
    }
  }

};
