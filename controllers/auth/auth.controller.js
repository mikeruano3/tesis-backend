const authService = require('../../services/auth.service');
const userSchema = require("../../schemas/user.schema");
const roleSchema = require("../../schemas/role.schema");
const md5 = require('md5');
require('dotenv').config();

/***
 * TODO: Cambiar a base de datos  
 */
exports.signin = async (req, res) => {
    try {
        let userData = await userSchema.findOne(
            { email: req.body.email, password: md5(req.body.password) },
            { password: 0 }).populate('role')
        if (userData) {
            let token = await authService.generateToken({ idUser: userData._id });
            return res.status(200).json({
                status: true, message: "OK", data: { accessToken: token, userData: userData }
            });
        }
        return res.status(200).json({ status: false, message: "Nombre de usuario o contraseña inválidos", data: "" });
    } catch (err) {
        return res.status(400).json(err);
    }
}

exports.registerAppUser = async (req, res) => {
    try {
        if (req.body.password) {
            req.body.password = md5(req.body.password)
        }
        if(req.body.email){
            let uniqueNameTester = await userSchema.findOne({ email: req.body.email })
            if(uniqueNameTester){
                return res.status(200).json({ status: false, 
                    message: "Este email ya se encuentra registrado!", data: req.body.email })
            }
        }
        let roleData = await roleSchema.findOne({ roleType: 2 })
        req.body.role = roleData
        let creationData = await userSchema.create(req.body)
        return res.status(200).json({ status: true, message: "OK", data: creationData });
    } catch (err) {
        return res.status(400).json(err);
    }
}

exports.updateAppUser = async(req, res) => {
    try{
        if (req.body.password) {
            req.body.password = md5(req.body.password)
        }
        let result = await userSchema.updateOne(
            {"_id": req.params.id},
            { $set: req.body}
        )
        return res.status(200).json({ status: true, message: "OK", data: result })
    }catch(err){
      return res.status(400).json(err)
    }
}