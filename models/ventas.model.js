var mongoose= require('mongoose');
var Producto= require('./producto.model');
var Schema = mongoose.Schema;
var esquema= new Schema({
    cliente:{
        nombre: {type:String},
        nit:{type:Number}
    },
    total:{type:Number},
    fecha: {type:Date},
    
    detalle:[{
        producto:{
            nombre:{type:String},
            categoria:{type: String},
            cantidad:{type:Number, min:0},
            precio:{type:Number,min:0}
        },
        cant:Number,
        importe:Number
    }],
  


});

module.exports=mongoose.model('Ventas',esquema);