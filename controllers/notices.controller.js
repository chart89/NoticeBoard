const Notice = require('../models/notices.model');
const sanitize = require('mongo-sanitize');
const getImageFileType = require('../utils/getImageFileType');
const fs= require('fs');
const User = require('../models/users.model');



exports.getAll = async (req, res) => {
    try {
      res.json(await Notice.find().populate('saler'));
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

exports.getById = async (req, res) => {

    try {
      const not = await Notice.findById(req.params.id);
      if(!not) res.status(404).json({ message: 'Not found' });
      else res.json(not);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.postOne = async (req, res) => {

    try {
      const { title, content, date, price, localization, login } = req.body;
      const fileType = req.file? await getImageFileType(req.file) : 'unknown';

      const user = await User.findOne({ login });
      //req.session.user = {login: user.login, id: user._id};

      console.log('user', req.session.user);
      console.log('file', req.file);
      console.log('body', req.body);
      const pattern = new RegExp('^[0-9]{2}-[0-9]{2}-[0-9]{4}');
      const datePatern = date.match(pattern);

      if (title && content && date && datePatern !== null && price && localization && req.file && ['image/jpeg', 'image/png', 'image/gif'].includes(fileType)) { 

      const cleanTitle = sanitize(title);
      const cleanContent = sanitize(content);
      const cleanLocalization = sanitize(localization);

      const newNotice = new Notice({ 
        title: cleanTitle,
        content: cleanContent,
        date: date, 
        price: price, 
        localization: cleanLocalization,
        picture: req.file.filename,
        saler: user.id });
      await newNotice.save();
      res.json({ message: 'OK' });
      } else {
        
        throw new Error('Invalid data');
      }
    } catch(err) {
      fs.unlinkSync('public/uploads/' + req.file.filename);
      res.status(500).json({ message: err });
    }
};

exports.putOne = async (req, res) => {
  
    try {
      
      const noticeExist = await Notice.findById(req.params.id);

      if(noticeExist){
        const { title, content, date, price, localization } = req.body;

        const fileType = req.file? await getImageFileType(req.file) : 'unknown';

        
        const pattern = new RegExp('^[0-9]{2}-[0-9]{2}-[0-9]{4}');
        const datePatern = date.match(pattern);

        if (title && content && date && datePatern !== null && price && localization) { 

          // file validation
          if (req.file && ['image/jpeg', 'image/png', 'image/gif'].includes(fileType) !== true){
            fs.unlinkSync('public/uploads/' + req.file.filename); // delete uncorrect file
            return res.status(400).send({ message: 'Bad photo'});
          } else if (req.file && noticeExist.picture) {
            fs.unlinkSync('public/uploads/' + noticeExist.picture); // if there is a new picture, the old one have to be deleted
          };

          const cleanTitle = sanitize(title);
          const cleanContent = sanitize(content);
          const cleanLocalization = sanitize(localization);

          await Notice.updateOne({ _id: req.params.id }, { $set: {
            title: cleanTitle,
            content: cleanContent, 
            date: date, 
            price: price,
            localization: cleanLocalization,
            picture: req.file? req.file.filename : noticeExist.picture, // if 
          }});

          const notCh = await Notice.findById(req.params.id);
          res.json(notCh);
        }
      } else {
        
        throw new Error('Invalid data');
      }
    } catch(err) {
      
      res.status(500).json({ message: err });
    }
}

exports.deleteOne = async (req, res) => {
  try {
    const not = await Notice.findById(req.params.id);
    if(not) {
      await Notice.deleteOne({ _id: req.params.id });
      res.json(not);
    } else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.searchAll = async (req, res) => {
    try {
        const findTitle = await Notice.find({title:{$regex: req.params.searchPhrase, $options:"i" }});
        res.json(findTitle);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};