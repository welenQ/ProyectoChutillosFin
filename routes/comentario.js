var express = require('express');
var router = express.Router();
var Verificar=require('../middleware/autenticacion');
var Comentario=require('../models/comentario.model');

router.get('/',Verificar.VerificarToken, function(req, res, next) {
    Comentario.find({estado:1},(err,query)=>{
      if(err){
          return res.status(302).json({lista:[],error:err,estado:'fail'});
       }
       if(!query){
           return res.status(302).json({lista:[],error:'no se que paso',estado:'fail'});
       }
       return res.status(200).json({lista:query,estado:'ok'});
    })
  });
  router.post('/agregar',Verificar.VerificarToken,async(req,res,next)=>{
      let datos=req.body;
      let p=new Comentario(datos);
      try{
          let nuevo =await p.save(); 
     
          if(nuevo){
              return res.status(200).json({nuevo:nuevo,estado:'ok'});
           }else
        
               return res.status(302).json({error:'no se que paso',estado:'fail'});
           
          }
      catch(err){
              return res.status(300).json({error:err,estado:'fail'});
          }  
  });
  
  
  router.put('/:id',Verificar.VerificarToken, function (req,res,next){
      let id=req.params.id;
          Comentario.findById(id, async(err,query)=>{
              if(err){
                 return res.status(302).json({lista:[],error:err,estado:'fail'});
              }
              if(!query){
                  return res.status(302).json({lista:[],error:'no se que paso',estado:'fail'});
              }
              query.texto=req.body.texto;
              query.fecha=req.body.fecha;
              query.usuario.nombre=req.body.usuario.nombre;
              query.usuario.apellido=req.body.usuario.apellido;
              query.usuario.login=req.body.usuario.login;
              query.usuario.password=req.body.usuario.password;              
              try{
              let com= await query.save();
              return res.status(200).json({lista:com,estado:'ok'});
             }
             catch(e){
                 return res.status(302).json({lista:[],error:'no se que pasooo',estado:'fail'});
              
             }
              
          });
      });
      router.get('/borrar/:id',Verificar.VerificarToken,(req,res,next)=>{
          Comentario.findById( req.params.id,(err,info)=>{
              if(err)
                  res.send('error');
              else{
                  info.estado=false;
                  info.save();
                  return res.status(200).json({lista:info,estado:'ok'});
              }
      });
      });
     
  module.exports = router;
  