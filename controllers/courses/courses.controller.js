
var courseItemSchema    = require("../../schemas/course.schema");
const mongoose          = require('mongoose')

exports.findOne = async(req, res) => {
  try{
    let result = await courseItemSchema.findOne({"_id": req.params.id})
    return res.json(result)
  }catch(err){
    return res.status(400).json(err)
  }
}

exports.findMany = async(req, res) => {
  try{
    let result = await courseItemSchema.find().sort( { name: 1 } )
    return res.json(result);
  }catch(err){
    return res.status(400).json(err)
  }
}

exports.findAll = async(req, res) => {
  try{
    let result = await courseItemSchema.find({});
    return res.json(result)
  }catch(err){
    return res.status(400).json(err)
  }
}

exports.insertOne = async(req, res) => {
  try{
    let item = new courseItemSchema(req.body);
    let result = await item.save();
    return res.json(result);
  }catch(err){
    return res.status(400).json(err)
  }
}

exports.update = async(req, res) => {
  try{
    let result = await courseItemSchema.updateOne(
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
    let result = await courseItemSchema.findByIdAndDelete({"_id": req.params.id});
    return res.json(result);
  }catch(err){
    return res.status(400).json(err)
  }
}