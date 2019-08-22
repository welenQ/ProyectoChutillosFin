var express =require('express');
var router=express.Router();
var Producto=require('../models/producto.model');

//"CRUD"
//GET LISTA
//POST INSERT
//PUT UPDATE
//DELETE DELETE
//GET //SEARCH

//REST API

//dominio.com/api/producto/

//dominio.com/producto/
router.get('/', function (req,res,next){
    /**
     * producto.find({},function(err,querry){   
     });
     */
     Producto.find({estado:1},(err,query)=>{
         if(err){
            return res.status(302).json({lista:[],error:err,estado:'fail'});
         }
         if(!query){
             return res.status(302).json({lista:[],error:'no se que paso',estado:'fail'});
         }
         return res.status(200).json({lista:query,estado:'ok'});
     });
 });
router.get('/nuevo',(res,req,next)=>{
        let t=new Producto();
        t.nombre='cocacola';
        t.categoria='gaseosas';
        t.cantidad=10;
        t.precio=12.5;
        t.save();

});
    //res.render('index',{title:'Express'});
    router.post('/',(req,res,next)=>{
        let 
         datos=req.body;
        let p=new Producto(datos);
        p.save((err,nuevo)=>{
            if(err){
                return res.status(302).json({nuevo:[],error:err,estado:'fail'});
             }
             if(!nuevo){
                 return res.status(302).json({error:'no se que paso',estado:'fail'});
             }
             return res.status(200).json({nuevo:nuevo, estado:'ok'});
        });
    });


router.post('/n',async(req,res,next)=>{
    let datos=req.body;
    let p=new Producto(datos);
    //de la forma sincronizada
    try{
        let nuevo =await p.save(); 
   
        if(nuevo){
            return res.status(200).json({nuevo:nuevo,estado:'ok'});
         }else
      
             return res.status(302).json({error:'no se que paso',estado:'fail'});
         
        }
        catch(err){
            return res.status(302).json({nuevo:{},error:err,estado:'fail'});
        }  
});
router.get('/borrar/:id',(req,res,next)=>{
    Producto.findById( req.params.id,(err,info)=>{
        if(err)
            res.send('error');
        else{
            info.estado=false;
            info.save();
            return res.status(200).json({lista:info,estado:'ok'});
        }
});
});

//dominio.com/api/producto/:id
router.put('/:id', function (req,res,next){
 let id=req.params.id;
     Producto.findById(id, async(err,query)=>{
         if(err){
            return res.status(302).json({lista:[],error:err,estado:'fail'});
         }
         if(!query){
             return res.status(302).json({lista:[],error:'no se que paso',estado:'fail'});
         }
         query.nombre=req.body.nombre;
         query.cantidad=req.body.cantidad;
         query.precio=req.body.precio;
         query.categoria=req.body.categoria;
         try{
         let prod= await query.save();
         return res.status(200).json({lista:prod,estado:'ok'});
        }
        catch(e){
            return res.status(302).json({lista:[],error:'no se que pasooo',estado:'fail'});
         
        }
         
     });
 });


 router.put('/otro/:id', function (req,res,next){
    let id=req.params.id;
        Producto.findByIdAndUpdate(id,req.body,(err,query)=>{
            if(err){
               return res.status(302).json({lista:[],error:err,estado:'fail'});
            }
            if(!query){
                return res.status(302).json({lista:[],error:'no se que paso',estado:'fail'});
            }
            return res.status(200).json({lista:query,estado:'ok'});
          
          
            
        });
    });

module.exports=router;