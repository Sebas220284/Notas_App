const {Schema,model}=require('mongoose')
const bcryptjs=require('bcryptjs')

 const UserSchema=new Schema({


name:{type:String,required:true,},
email:{type:String,required:true,unique:true},
contraseña:{type:String,required:true}


},{
    timestamps:true
})
//esta funcion sirve para podercifrar las contraseñas con encriptacion mediante asincronia.
UserSchema.methods.encyptPassword=async contraseña=>{

   const salt=await bcryptjs.genSalt(10)
   return await bcryptjs.hash(contraseña,salt)
}

UserSchema.methods.matchPassword=async function(contraseña){
   return await bcryptjs.compare(contraseña,this.contraseña)

}

module.exports=model('User',UserSchema)