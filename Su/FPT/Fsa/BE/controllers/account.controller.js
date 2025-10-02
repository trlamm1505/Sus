const AccountModel = require('../models/account.model');
const bcrypt = require('bcrypt');
const typerole = require('../constants/typerole');
const { verify } = require('jsonwebtoken');

module.exports = {
    getAllAccounts: async (req, res) => {
     
            const accounts = await AccountModel.find();
            res.status(200).json(accounts);
    },
    

    deleteAccount: async (req, res) => {

    try {
    const { userid, isActive } = req.body;     // nhận trạng thái từ body

    if (typeof isActive !== 'boolean') {
      return res.status(400).json({ message: 'isActive phải là boolean' });
    }

    const account = await AccountModel.findOneAndUpdate(
      { userid },
      { isActive },
      { new: true } // trả về document mới
    );

    if (!account) {
      return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
    }

    res.status(200).json(account);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
    },
    updateAccount: async (req, res) => {
        try {
    const { userid } = req.params; // lấy userid từ URL

    // Các trường có thể update (bạn muốn cho phép trường nào thì liệt kê ra)
    const {
      username,
      email,
      phoneNumber,
      fullName,
      identifyNumber,
      age,
      address,
      dateOfBirth,
      role,
      isActive
    } = req.body;

    // Tạo object chứa dữ liệu mới
    const updateData = {
      username,
      email,
      phoneNumber,
      fullName,
      identifyNumber,
      age,
      address,
      dateOfBirth,
      role,
      isActive
    };

    // Xoá các field undefined (chỉ update field có gửi lên)
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const updatedAccount = await AccountModel.findOneAndUpdate(
      { userid },          // tìm theo userid
      updateData,          // dữ liệu mới
      { new: true }        // trả về document mới
    );

    if (!updatedAccount) {
      return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
    }

    res.status(200).json(updatedAccount);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
    },
    verifyAccount: async (req, res) => {
        try {
    const { userid } = req.params; // lấy userid từ URL

    const account = await AccountModel.findOneAndUpdate(
      { userid },
      { isActive: true },
      { new: true }
    );

    if (!account) {
      return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
    }

    // Có thể redirect tới trang login hoặc trả JSON
    // res.redirect('http://frontend.com/login'); 
    res.status(200).json({ message: 'Tài khoản đã được kích hoạt', account });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
    }

   
    
}
