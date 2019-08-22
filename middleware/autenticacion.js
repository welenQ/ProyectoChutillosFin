var jwt=require('jsonwebtoken');
var secret=require('../config/config');
exports.VerificarToken=function(req,res,next){
    //dominio.com/usuario/?token
    let token=req.query.token;
    jwt.verify(token,secret.PALABRASECRETA,(err,decode)=>{
        if(err){
            return res.status(401).json({
                estado:'fail',
                error:err,
                msg:'acceso privado'
                
            });
        }
            req.usuario=decode.usuario;
            next();
        
    });
}