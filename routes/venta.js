var express =require('express');
var router=express.Router();
var Venta= require('../models/venta.model');

router.get('/lista',(req,res,next)=>{
    Venta.find({estado:1},(err,query)=>{
        if(err){
            return res.status(302).json({lista:[],error:err,estado:'fail'});
         }
         if(!query){
             return res.status(302).json({lista:[],error:'no se que paso',estado:'fail'});
         }
         return res.status(200).json({lista:query,estado:'ok'});     
    });
});
router.post('/borrar/:id',(req,res,next)=>{
    Venta.findByIdAndUpdate( req.params.id,(err,info)=>{
        if(err)
            res.send('errr');
        else{
            info.estado=0;
            info.save();
            res.send('/OK');
        }
});
});
router.post('/nueva', (req,res,next)=>{
    let dat= req.body;
    let v=new Venta(dat);
    Venta.findById(dat.producto,async(err,dato)=>{
        v.producto=dato;
   
    try{
    let nuevo=await v.save();

    if(nuevo){
        return res.status(200).json({nuevo:nuevo,estado:'ok'});
    }else

     return res.status(302).json({error:'no se que paso',estado:'fail'});
 
    }
    catch(err){
    return res.status(302).json({nuevo:{},error:err,estado:'fail'});
    }  
    
});
 });

module.exports=router;