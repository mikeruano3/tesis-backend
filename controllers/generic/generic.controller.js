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
      {"_id": req.body.query.id},
      { $set: req.body.data}
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