var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var esquema= new Schema({
    nombre:{type:String,required:true},
    apelido:{type:String},
    login:{type:String,required:true},
    password:{type:String,required:true},
});
module.exports=mongoose.model('Usuario',esquema);