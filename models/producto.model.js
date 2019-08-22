var mongoose= require('mongoose');
var Schema = mongoose.Schema;
var esquema= new Schema({
    nombre:{type:String,required:true},
    categoria:{type: String},
    cantidad:{type:Number, min:0},
    precio:{type:Number,min:0},
    estado:{type:Boolean,default:true},
   
});
module.exports=mongoose.model('Producto',esquema);