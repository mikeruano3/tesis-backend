
var itemSchema    = require("../../schemas/category.schema");
const mongoose    = require('mongoose')

exports.findOne = async(req, res) => {
  try{
    let result = await itemSchema.findOne({"_id": req.params.id})
    return res.json(result)
  }catch(err){
    return res.status(400).json(err)
  }
}

exports.findMany = async(req, res) => {
  try{
    let result = await itemSchema.find().sort( { name: 1 } )
    return res.json(result);
  }catch(err){
    return res.status(400).json(err)
  }
}

exports.findAll = async(req, res) => {
  try{
    let result = await itemSchema.find({});
    return res.json(result)
  }catch(err){
    return res.status(400).json(err)
  }
}

exports.insertOne = async(req, res) => {
  try{
    let item = new itemSchema(req.body);
    let result = await item.save();
    return res.json(result);
  }catch(err){
    return res.status(400).json(err)
  }
}

exports.update = async(req, res) => {
  try{
    let result = await itemSchema.updateOne(
      {"_id": req.params.id},
      { $set: req.body}
    )
    return res.json(result)
  }catch(err){
    return res.status(400).json(err)
  }
}

exports.deleteRow = async(req, res) => {
  try{
    let result = await itemSchema.findByIdAndDelete({"_id": req.params.id});
    return res.json(result);
  }catch(err){
    return res.status(400).json(err)
  }
}