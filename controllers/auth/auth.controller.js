const authService = require('../../services/auth.service');
const userSchema = require("../../schemas/user.schema");
const roleSchema = require("../../schemas/role.schema");
const sendEmail = require("../../services/sendmail");
const md5 = require('md5');
require('dotenv').config();

/**********************************
 * INICIAR SESIÓN EN LA APLICACIÓN
 *********************************/
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

        if( !req.body.email || req.body.email == '' ){
            return res.status(200).json({ status: false, 
                message: "Proporcione un correo electrónico!", data: req.body.email })
        }
        if (req.body.password) {
            req.body.password = md5(req.body.password)
        }

        let uniqueNameTester = await userSchema.findOne({ email: req.body.email })
        if(uniqueNameTester){
            return res.status(200).json({ status: false, 
                message: "Este email ya se encuentra registrado!", data: req.body.email })
        }
        let roleData = await roleSchema.findOne({ roleType: 2 })
        req.body.role = roleData

        if(process.env.VALIDATE_EMAIL == 1){
            const token = Math.random().toString(25).substring(2)
            await sendEmail.sendConfirmEmail(token, req.body.email)
            req.body.emailConfirmationToken = token
        }else{
            req.body.verifiedEmailStatus = 1
        }
        
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

/***********************************************************************
 * ENVIA UN EMAIL CON UN LINK DE CONFIRMACION QUE ABRIRÁ UNA 
 * PÁGINA PARA ESCRIBIR EL NUEVO PASSWORD, SETEA UN TOKEN QUE
 * SE USARÁ PARA HACER MATCH CON EL USUARIO QUE PIDIÓ EL CAMBIO
 *********************************************************************/

exports.sendEmailResetPassword = async (req, res) => {
    try {
        if(req.body.email){
            let userData = await userSchema.findOne({ email: req.body.email })
            if(!userData || !userData._id){
                return res.status(200).json({ status: false, 
                    message: "Este email no se encuentra registrado!", data: req.body.email })
            }
            const token = Math.random().toString(25).substring(2);
            let resultUpdate = await userSchema.updateOne(
                {"_id": userData._id},
                { $set: { passwordResetToken : token }}
            )
            const resultEmail = await sendEmail.sendReestablishEmail(token, req.body.email)
            return res.status(200).json({ status: true, message: "OK", data: { token: resultEmail } })
        }else{
            return res.status(200).json({ status: false, message: "Email no encontrado!", data: req.body.email })
        }
        
    } catch (err) {
        return res.status(400).json(err);
    }
}

/***********************************************************************
 * RECIBE Y SETEA EL NUEVO PASSWORD QUE ES MANDADO DESDE UN FRONTEND
 *********************************************************************/

exports.resetPasswordWithData = async (req, res) => {
    try {
        if(req.body.password && req.body.token){
            let userData = await userSchema.findOne({ passwordResetToken: req.body.token })
            if(!userData || !userData._id){
                return res.status(200).json({ status: false, 
                    message: "El token ha expirado, vuelva a enviar el formulario", data: "No se encuentra el usuario!" })
            }
            let resultUpdate = await userSchema.updateOne(
                {"_id": userData._id},
                { $set: { passwordResetToken : null, password: md5(req.body.password) }}
            )
            return res.status(200).json({ status: true, message: "OK", data: "Contraseña restablecida correctamente!" })
        }else{
            return res.status(200).json({ status: false, message: "Ha habido un error!", data: "El link no funciona" })
        }
    } catch (err) {
        return res.status(400).json(err);
    }
}

/***********************************************************************
 * RECIBE UN TOKEN, BUSCA EL USUARIO ASOCIADO, CAMBIA EL ESTADO
 * A verifiedEmailStatus = 1 Y ELIMINA EL TOKEN
 *********************************************************************/

exports.confirmEmailWithToken = async (req, res) => {
    try {
        if(req.params.id){
            let userData = await userSchema.findOne({ emailConfirmationToken: req.params.id })
            if(!userData || !userData._id){
                return res.status(200).json({ status: false, 
                    message: "El token ha expirado o es inválido!", data: req.params.id })
            }
            let resultUpdate = await userSchema.updateOne(
                {"_id": userData._id},
                { $set: { emailConfirmationToken : null, verifiedEmailStatus: 1 }}
            )
            return res.status(200).json({ status: true, message: "Email confirmado!", data: resultUpdate })
        }else{
            return res.status(200).json({ status: false, message: "Token no encontrado!", data: '' })
        }
        
    } catch (err) {
        return res.status(400).json(err);
    }
}