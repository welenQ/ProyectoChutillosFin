var mongoose= require('mongoose');
var Schema = mongoose.Schema;
var esquema= new Schema({
    nombre:{type:String,required:true},
    institucion:{type: String},
    presidente:{type: String},
    delegado:{type: String},
    reyna:[{
        nombre:{type:String,required:true},
        apellido:{type: String},
        edad:{type:Number},
        ciudad:{type:String},
        foto:{type:String},
    }],
    cantidad:{type:Number},
    danza:[{
        nombre:String,
        tipo:String,
        foto:{type:String},
    }],
    dia:Date,
    hora:Number,
    estado:{type:Boolean,default:true},
   
});
module.exports=mongoose.model('Fraternidad',esquema);