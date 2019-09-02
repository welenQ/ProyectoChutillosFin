var express = require('express');
var router = express.Router();
var Fraternidad= require('../models/fraternidad.model');
var Verificar=require('../middleware/autenticacion');

router.get('/lista',Verificar.VerificarToken, function(req, res, next) {
    Fraternidad.find({estado:1},(err,query)=>{
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
      let p=new Fraternidad(datos);
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
          Fraternidad.findById(id, async(err,query)=>{
              if(err){
                 return res.status(302).json({lista:[],error:err,estado:'fail'});
              }
              if(!query){
                  return res.status(302).json({lista:[],error:'no se que paso',estado:'fail'});
              }
              query.nombre=req.body.nombre;
              query.institucion=req.body.institucion;
              query.presidente=req.body.presidente;
              query.delegado=req.body.delegado;
              query.reyna.nombre=req.body.reyna.nombre;
              query.reyna.apellido=req.body.reyna.apellido;
              query.reyna.edad=req.body.reyna.edad;
              query.reyna.ciudad=req.body.reyna.ciudad;
              query.reyna.foto=req.body.reyna.foto;
              query.cantidad=req.body.cantidad;
              query.danza.nombre=req.body.danza.nombre;
              query.danza.tipo=req.body.danza.tipo;
              query.danza.foto=req.body.danza.foto;
              query.dia=req.body.dia;
              query.hora=req.body.hora;
              try{
              let frater= await query.save();
              return res.status(200).json({lista:frater,estado:'ok'});
             }
             catch(e){
                 return res.status(302).json({lista:[],error:'no se que pasooo',estado:'fail'});
              
             }
              
          });
      });
      router.get('/borrar/:id',Verificar.VerificarToken,(req,res,next)=>{
          Fraternidad.findById( req.params.id,(err,info)=>{
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
