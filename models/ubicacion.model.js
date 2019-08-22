var mongoose= require('mongoose');
var Schema = mongoose.Schema;
var esquema= new Schema({
    lat:{type:String},
    long:{type: String},
    detalle:[{
        fraternidad:{
            nombre:{type:String},
            institucion:{type: String},
            presidente:{type:String},
            delegado:{type:String}
        },
        reyna:{
            nombre:String,
            apellido:String,
            edad:Number,
            ciudad:String,
            foto:String,
        }, 
        danza:{
            nombre:String,
            tipo:String,
            foto:String,
        }
        
    }],
    cantidad:{type:Number, min:0},
    hora:{type:String},
    dia:Date,
    estado:{type:Boolean,default:true},
   
});
module.exports=mongoose.model('Ubicacion',esquema);