const courseSchema  = require("../../schemas/course.schema");

exports.findSchema = async(req, res, next) => {
  try{
    if(!req.params.schemaId){
        return res.status(400).json({status: false, message: 'NO SCHEMA IN REQUEST'})
    }
    let schema = await selectSchema(req.params.schemaId)
    if(schema == null){
      return res.status(400).json({status: false, message: 'NO SCHEMA'})  
    }else{
      req.schema = schema
      next()
    }
  }catch(err){
    return res.status(400).json({status: false, message: err})
  }
}


selectSchema = async(schemaId)=>{
  switch (schemaId) {
    case 'course':
        return courseSchema
    case 'career':
        return courseSchema
    default:
        return null
  }
}