
const Notice = require('../models/notices.model');


exports.getAll = async (req, res) => {
    try {
      res.json(await Notice.find());
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
  
      const { author } = req.body;
      
      const newNotice = new Notice({ author: author });
      await newNotice.save();
      res.json({ message: 'OK' });
  
    } catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.putOne = async (req, res) => {
    const { author } = req.body;
  
    try {
      const not = await Notice.findById(req.params.id);
      if(not){
      await Notice.updateOne({ _id: req.params.id }, { $set: { author }});
      const notCh = await Notice.findById(req.params.id);
      res.json(notCh);
      } else res.status(404).json({message: 'Not found...'});
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

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
        const findTitle = await Notice.find({author:{$regex: req.params.searchPhrase, $options:"i" }});
        res.json(findTitle);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
  };