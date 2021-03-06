const mongoose          = require('mongoose')

exports.findOne = async(req, res) => {
  try{
    return res.json(await req.schema.findOne({"_id": req.params.id}))
  }catch(err){
    return res.status(400).json(err)
  }
}

exports.findAll = async(req, res) => {
  try{
    return res.json(await req.schema.find());
  }catch(err){
    return res.status(400).json(err)
  }
}

exports.findByFilter = async(req, res) => {
  try{
    return res.json( await req.schema.find(
                req.body.query, req.body.projection
              ).sort(req.body.sort)
              .populate(req.body.populate)
              .populate(req.body.populate2)
              .populate(req.body.populate3)
              .limit(req.body.limit)
              .skip(req.body.skip)
            )
  }catch(err){
    return res.status(400).json(err)
  }
}

exports.insertOne = async(req, res) => {
  try{
    let item = new req.schema(req.body);
    let result = await item.save();
    return res.json(result);
  }catch(err){
    return res.status(400).json(err)
  }
}

exports.update = async(req, res) => {
  try{
    let result = await req.schema.updateOne(
      req.body.query,
      req.body.data
    )
    return res.json(result)
  }catch(err){
    return res.status(400).json(err)
  }
}

exports.deleteRow = async(req, res) => {
  try{
    let result = await req.schema.findByIdAndDelete({"_id": req.params.id});
    return res.json(result);
  }catch(err){
    return res.status(400).json(err)
  }
}