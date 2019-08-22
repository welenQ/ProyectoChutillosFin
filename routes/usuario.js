var express = require('express');
var router = express.Router();
var Usuario =require('../models/usuario.model');
var bcrypt=require('bcrypt');
var jwt=require('jsonwebtoken');
var Verificar=require('../middleware/autenticacion');
/* GET home page. */
router.post('/agregar',async(req,res,next)=>{
    let u= new Usuario(req.body);
    console.log(req.body);
    u.password= bcrypt.hashSync(u.password,10);
    u.save((err,usuario)=>{

        if(usuario){
            return res.status(200).json({nuevo:usuario,estado:'ok'});
         }if(err)
      
             return res.status(302).json({error:'no se que paso',estado:'fail'});
         
        
      else
            return res.status(302).json({error:err,estado:'fail'});
        });      
});

router.post('/',Verificar.VerificarToken,(req,res,next)=>{
    let u=new Usuario(req.body);
    //forma asincrona
    u.password= bcrypt.hashSync(u.password,10);
    u.save((err,usuario)=>{
        if(err){
            return res.status(302).json({error:err,estado:'fail'});
        }
        if(usuario){
            
        return res.status(200).json({usuario:usuario,estado:'ok'});
        }
        else
        
        return res.status(302).json({error:'no se que paso',estado:'fail'});
    });
});
router.post('/login', function(req, res, next) {
  Usuario.find({login:req.body.login},(err,user)=>{
    if(err){
        return res.status(302).json({error:err,estado:'fail'});
    }
    if(user.length==0)
    return res.status(302).json({error:'no existe el usuario', estado:'fail' });
    console.log(req.body.password,user[0].password);
    if(bcrypt.compareSync(req.body.password,user[0].password)){
        let token=jwt.sign({usuario:user[0].login,iat:Math.floor(Date.now()/1000)-30},'afdsdsadafafewre3');
        console.log(user);
        return res.status(200).json({usuario:user[0],token:token,estado:'ok'});
    }
    else
    
    return res.status(302).json({error:'no existe el ususario',estado:'fail'});

  });
});

module.exports = router;
