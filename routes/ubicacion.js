var express = require('express');
var router = express.Router();
var Ubicacion=require('../models/ubicacion.model');



router.get('/', function(req, res, next) {
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
  router.post('/agregar',async(req,res,next)=>{
      let datos=req.body;
      let p=new Ubicacion(datos);
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
  
  
  router.put('/:id', function (req,res,next){
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
              query.detalle.fraternidad.nombre=req.body.detalle.fraternidad.nombre;
              query.detalle.fraternidad.institucion=req.body.detalle.fraternidad.institucion;
              query.detalle.fraternidad.presidente=req.body.detalle.fraternidad.presidente;            query.detalle.fraternidad.nombre=req.body.detalle.fraternidad.nombre;
              query.detalle.fraternidad.delegado=req.body.detalle.fraternidad.delegado;         query.cantidad=req.body.cantidad;
              query.reyna.nombre=req.body.reyna.nombre;
              query.reyna.apellido=req.body.reyna.apellido;
              query.reyna.edad=req.body.reyna.nombre;
              query.reyna.ciudad=req.body.reyna.ciudad;
              query.reyna.foto=req.body.reyna.foto;
              query.danza.nombre=req.body.danza.nombre;
              query.danza.tipo=req.body.danza.tipo;
              query.danza.foto=req.body.danza.foto;
              query.cantidad=req.body.cantidad;
              query.dia=req.body.dia;
              query.hora=req.body.hora;

              
              try{
              let ubi= await query.save();
              return res.status(200).json({lista:ubi,estado:'ok'});
             }
             catch(e){
                 return res.status(302).json({lista:[],error:'no se que pasooo',estado:'fail'});
              
             }
              
          });
      });
      router.get('/borrar/:id',(req,res,next)=>{
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

