const commentSchema  = require("../../schemas/comment.schema");
const courseSchema  = require("../../schemas/course.schema");
const fileSchema  = require("../../schemas/file.schema");
const postSchema  = require("../../schemas/post.schema");
const postCategorySchema  = require("../../schemas/postCategory.schema");
const reactionSchema  = require("../../schemas/reaction.schema");
const roleSchema  = require("../../schemas/role.schema");
const userSchema  = require("../../schemas/user.schema");

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
    case 'comments':
        return commentSchema
    case 'courses':
        return courseSchema
    case 'files':
        return fileSchema
    case 'posts':
        return postSchema
    case 'postcategories':
        return postCategorySchema
    case 'reactions':
        return reactionSchema
    case 'roles':
        return roleSchema
    case 'users':
        return userSchema
    default:
        return null
  }
}