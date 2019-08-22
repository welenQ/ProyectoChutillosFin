var express =require('express');
var router=express.Router();
var Compra= require('../models/compra.model');
router.get('/lista',(req,res,next)=>{
    Compra.find({estado:1},(err,query)=>{
        if(err){
            return res.status(302).json({lista:[],error:err,estado:'fail'});
         }
         if(!query){
             return res.status(302).json({lista:[],error:'no se que paso',estado:'fail'});
         }
         return res.status(200).json({lista:query,estado:'ok'});
     
    });
});
router.get('/borrar/:id',(req,res,next)=>{
    Compra.findById( req.params.id,(err,info)=>{
        if(err)
            res.send('errr');
        else{
            info.estado=false;
            info.save();
            return res.status(200).json({lista:info,estado:'ok'});
        }
});
});
router.get('/editar/id')
router.post('/editar/:id',(req,res,next)=>{
    Compra.findOne(req.params.id,(err,info)=>{
        if(err)
        res.send('err');
        else
        {
            res.send('actualizado!')
        }
    })
});
router.post('/nueva', async(req,res,next)=>{
    let datos= req.body;
    let com=new Compra(datos);
    try{
        let nuevo =await com.save(); 
   
        if(nuevo){
            return res.status(200).json({nuevo:nuevo,estado:'ok'});
         }else
      
             return res.status(302).json({error:'no se que paso',estado:'fail'});
         
        }
        catch(err){
            return res.status(302).json({nuevo:{},error:err,estado:'fail'});
        }  
});

module.exports=router;