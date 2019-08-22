var mongoose= require('mongoose');
var Schema = mongoose.Schema;
var esquema= new Schema({
    texto:{type:String,required:true},
    fecha:Date,
    hora:String,
    usuario:[{
        nombre:{type:String,required:true},
        apellido:{type:String},
        login:{type:String,required:true},
        password:{type:String,required:true},
    }],
   estado:{type:Boolean,default:true},
});
module.exports=mongoose.model('Comentario',esquema);