var express = require('express');
var router = express.Router();
var Reyna=require('../models/reyna.model');

/* GET home page. */
router.get('/',Verificar.VerificarToken, function(req, res, next) {
  Reyna.find({estado:1},(err,query)=>{
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
    let p=new Reyna(datos);
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
        Reyna.findById(id, async(err,query)=>{
            if(err){
               return res.status(302).json({lista:[],error:err,estado:'fail'});
            }
            if(!query){
                return res.status(302).json({lista:[],error:'no se que paso',estado:'fail'});
            }
            query.nombre=req.body.nombre;
            query.apellido=req.body.apellido;
            query.edad=req.body.edad;
            query.ciudad=req.body.ciudad;
            query.foto=req.body.foto;
            
            try{
            let rey= await query.save();
            return res.status(200).json({lista:rey,estado:'ok'});
           }
           catch(e){
               return res.status(302).json({lista:[],error:'no se que pasooo',estado:'fail'});
            
           }
            
        });
    });
    router.get('/borrar/:id',Verificar.VerificarToken,(req,res,next)=>{
        Reyna.findById( req.params.id,(err,info)=>{
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
