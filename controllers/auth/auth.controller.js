const authService 	        = require('../../services/auth.service');
const userSchema            = require("../../schemas/user.schema");
require('dotenv').config();

/***
 * TODO: Cambiar a base de datos  
 */
exports.signin = async (req, res) => {
    const idUser = 1
    let userData = await userSchema.findOne(
        {username: req.body.username, password: req.body.password},
        {password: 0})
    if(userData){
        let token = await authService.generateToken({
            idUser: idUser
        });
        return res.status(200).json(
            {status: "true", message: "OK", data: {
                accessToken: token,
                userData: userData
            }}
        );
    }
    return res.status(200).json({status: "false", message: "Nombre de usuario o contraseña inválidos", data: ""});
}