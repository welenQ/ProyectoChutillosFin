var mongoose= require('mongoose');
var Schema = mongoose.Schema;
var esquema= new Schema({
    nombre:{type:String},
    apellido:{type: String},
    edad:{type:Number},
    ciudad:{type:String},
    foto:[{type:String}],
    estado:{type:Boolean,default:true},
   
});
module.exports=mongoose.model('Reyna',esquema);