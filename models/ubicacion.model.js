var mongoose= require('mongoose');
var Schema = mongoose.Schema;
var esquema= new Schema({
    lat:{type:String},
    long:{type: String},
    
        fraternidad:{
            nombre:{type:String},
            institucion:{type: String},
            presidente:{type:String},
            delegado:{type:String},
         reyna:{
            nombre:String,
            apellido:String,
            edad:Number,
            ciudad:String,
            foto:{type:String},
        },
        danza:{
            nombre:String,
            tipo:String,
            foto:[{type:String}],
        },
        cantidad:Number,
        dia:Number,
        hora:Number
     },    
    
    comentario:{
        texto:{type:String,required:true},
        fecha:Date,
        usuario:{
            nombre:{type:String,required:true},
            apellido:{type:String},
            login:{type:String,required:true},
            password:{type:String,required:true},
        }
    },
    estado:{type:Boolean,default:true}

   
});
module.exports=mongoose.model('Ubicacion',esquema);