const passport=require('passport')
const LocalStrategy= require('passport-local').Strategy
const User= require('../models/User')

passport.use(new LocalStrategy({

    usernameField:'email',
    passwordField:'contraseña'
},async (email,contraseña,done)=>{
    //confirmar si existe el correo

const user= await User.findOne({email})
if(!user){
    return done(null, false,{message:'USUARIO NO ENCONTRADO'})
}else{
   //validar contraseña
   const match=  await user.matchPassword(contraseña)
   if(match){
    return done(null,user)
   }else{
    return done(null,false,{message:'CONTRASEÑA INCORRECTA'})
   }
}

}))

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
  
    User.findById(id,(err,user)=>{
        done(err,user)
    })
})


