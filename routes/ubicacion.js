var express = require('express');
var router = express.Router();
var Ubicacion=require('../models/ubicacion.model');

var Verificar=require('../middleware/autenticacion');


router.get('/',Verificar.VerificarToken, function(req, res, next) {
    Ubicacion.find({estado:1},(err,query)=>{
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
      let p=new Ubicacion(datos);
      try{
          let fe=Date.now();
          
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
          Ubicacion.findById(id, async(err,query)=>{
              if(err){
                 return res.status(302).json({lista:[],error:err,estado:'fail'});
              }
              if(!query){
                  return res.status(302).json({lista:[],error:'no se que paso',estado:'fail'});
              }
              query.lat=req.body.lat;
              query.long=req.body.long;
              query.fraternidad.nombre=req.body.fraternidad.nombre;
              query.fraternidad.institucion=req.body.fraternidad.institucion;
              query.fraternidad.presidente=req.body.fraternidad.presidente;            
              query.fraternidad.nombre=req.body.fraternidad.nombre;
              query.fraternidad.delegado=req.body.fraternidad.delegado;         
              query.fraternidad.reyna.nombre=req.body.reyna.nombre;
              query.fraternidad.reyna.apellido=req.body.reyna.apellido;
              query.fraternidad.reyna.edad=req.body.reyna.nombre;
              query.fraternidad.reyna.ciudad=req.body.reyna.ciudad;
              query.fraternidad.reyna.foto=req.body.reyna.foto;
              query.fraternidad.danza.nombre=req.body.danza.nombre;
              query.fraternidad.danza.tipo=req.body.danza.tipo;
              query.fraternidad.danza.foto=req.body.danza.foto;
              query.fraternidad.cantidad=req.body.fraternidad.cantidad;
              query.fraternidad.dia=req.body.fraternidad.dia;
              query.fraternidad.hora=req.body.fraternidad.hora;
              query.comentario.texto=req.body.comentario.texto;
              query.comentario.fecha=req.body.comentario.fecha;
              query.comentario.usuario.nombre=req.body.comentario.usuario.nombre;
              query.comentario.usuario.apellido=req.body.comentario.usuario.apellido;
              query.comentario.usuario.login=req.body.comentario.usuario.login;
              query.comentario.usuario.password=req.body.comentario.usuario.password;
              try{
              let ubi= await query.save();
              return res.status(200).json({lista:ubi,estado:'ok'});
             }
             catch(e){
                 return res.status(302).json({lista:[],error:'no se que pasooo',estado:'fail'});
              
             }
              
          });
      });
      router.get('/borrar/:id',Verificar.VerificarToken,(req,res,next)=>{
          Ubicacion.findById( req.params.id,(err,info)=>{
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

