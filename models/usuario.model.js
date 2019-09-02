var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var esquema= new Schema({
    nombre:{type:String,required:true},
    apellido:{type:String},
    login:{type:String,required:true, unique:true},
    password:{type:String,required:true},
    tipo:{type:Boolean, default:false},
});
module.exports=mongoose.model('Usuario',esquema);