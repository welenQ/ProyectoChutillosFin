var express = require('express');
var router = express.Router();
var Ventas=require('../models/ventas.model');

/* GET home page. */
//dominio.com/api/ventas
router.get('/', function(req, res, next) {
    Ventas.find((err,lista)=>{
        if(err){
          
            return res.status(302).json({lista:[],error:err,estado:'fail'});
       
        }
        return res.status(200).json({lista:lista,estado:'ok'});
          
    })
});
router.post('/', async function(req, res, next) {
    let total=0;
    for(let i=0;i<req.body.detalle.length;i++){
        total+=req.body.detalle[i].cant*
                req.body.detalle[i].producto.precio;
    }
    req.body.total=total;

    let v =new Ventas(req.body);
    console.log(v);
    try{
        let t= await v.save();
        console.log(99999);
        return res.status(200).json({lista:t,estado:'ok'});
          
    }
    catch(err){
        return res.status(302).json({lista:[],error:err,estado:'fail'});
       
    }
});

module.exports = router;
