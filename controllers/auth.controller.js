const User = require('../models/users.model');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');

exports.register = async (req, res) => {
    try {
      const { login, password } = req.body;
      const fileType = req.file? await getImageFileType(req.file) : 'unknown';
    
      if (login && typeof login === 'string' && password && typeof password === 'string' && req.file && ['image/jpeg', 'image/png', 'image/gif'].includes(fileType)) {
        const userWithLogin = await User.findOne({ login });
        if (userWithLogin) {
            return res.status(409).json({ message: 'User with this login already exists' });
        };

        const newUser = new User({ login, password: await bcrypt.hash(password, 10), avatar: req.file.filename });
        await newUser.save();

        res.status(201).send({ message: 'User created ' + login });
      } else {
        res.status(400).send({ message: 'Bad request' });
      }
    } catch (err) {
      fs.unlinkSync('public/uploads/' + req.file.filename);
      res.status(500).json({ message: err });

    }
};

exports.login = async (req, res) => {
    try {
      const { login, password } = req.body;
      if (login && typeof login === 'string' && password && typeof password === 'string') {
        const user = await User.findOne({ login });
      
        if (!user) {
            res.status(400).send({ message: 'Login or password are incorrect' });
        } else {
            if (bcrypt.compareSync(password, user.password)) {
                req.session.user = {login: user.login, id: user._id};
    
                res.status(200).send({ message: 'Login successful' });
            } else {
                res.status(400).send({ message: 'Login or password are incorrect' });
            }
        }
      }

    } catch (err) {
      res.status(500).json({ message: err });
    }
}

exports.logout = async (req, res) => {
  await req.session.destroy();
    res.send({ message: "Session end"});
  
}

exports.getUser = async (req, res) => {
    res.send({ message: 'Yeh, you are logged!'});
}