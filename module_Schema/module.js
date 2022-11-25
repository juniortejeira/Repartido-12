const { Schema, model, default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');

const data_users = new Schema ({
    username:{type:String || Number,require:true,unique:true},
    password:{type:String || Number, require:true}
},{versionKey: false});

//pre=previo a que guarde, ejecutame este if 
//guardar password encriptado
var saltRound = 8;
data_users.pre('save', function(next){
    if(this.inNew || this.isModified('password')){
        const document = this;


        //creamos un hash(encripar) que debe recu=ibir 3 argumentos(password,cant saltos,collback ) 
        bcrypt.hash(document.password,saltRound,(err,hashedpassword)=>{
            //atrapamos el error
            if(err){
                next(err);
            }else{
                document.password = hashedpassword;
                next();
            }
        })

    }else{
        next();
    } 
})

//comparamos el password y la encriptacion
data_users.methods.inCorrectpasswordCreada = function(candidatepassword, callback){
    bcrypt.compare(candidatepassword, this.password,function(err,same){
        if(err){
            callback(err);
        }else{
            callback(err,same)
        }
    })
}





module.exports = mongoose.model('Usuario', data_users); 