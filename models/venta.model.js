var mongoose= require('mongoose');
var Schema = mongoose.Schema;
var esquema= new Schema({
    producto:[{
        nombre:{type:String},
        categoria:{type: String},
        cantidad:{type:Number, min:0},
        precio:{type:Number,min:0}

    }],
    precioVenta:{type:Number},
    cantidadV: {type:Number},
    cliente:[{
        nombre: {type:String},
        apellidos:{type: String},
        ci:{type:String}
    }],
    estado:{type:Number},

});

module.exports=mongoose.model('Venta',esquema);