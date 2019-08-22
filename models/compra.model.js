var mongoose= require('mongoose');
var Schema = mongoose.Schema;
var esquema= new Schema({
    producto:{type: Number},
    precio_compra:{type:Number},
    cantidad:{type:Number},
    estado:{type:Boolean, default:true},
});
module.exports=mongoose.model('Compra',esquema);
  