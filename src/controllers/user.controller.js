const userController={}
const passport=require('passport')
const User=require ('../models/User')

userController.renderSignupForm=(req,res)=>{
   res.render('users/signub')
}

userController.signup=async(req,res)=>{
    const errors=[]
const{name,email,contraseña,confirmar_contraseña}= req.body
if (contraseña!= confirmar_contraseña){
    errors.push({text:'Contraseña no coincide'})
}
if(contraseña.length<4){
    errors.push({text:'La contraseña debe de tener mas de 4 caracteres'})
}



if(errors.length>0){
    res.render('users/signub',{errors,
        name,
        email})
    
}
else {
 const emailUser= await User.findOne({email:email})
 if(emailUser){
    req.flash('error_msg','el correo esta en uso')
    res.redirect('/users/signub')
 }
 else{
    const newUser= new User({name,email,contraseña})

    newUser.contraseña=await newUser.encyptPassword(contraseña)
    await newUser.save()
    req.flash('success_msg','ESTAS REGISTRADO')
    res.redirect('/users/signin')
 }
}
}

userController.renderSigninForm=(req,res)=>{


    res.render('users/signin')
}
userController.signin= passport.authenticate('local',{
    failureRedirect:'/users/signin',
    successRedirect:'/notes',
    failureFlash:true
})




userController.logout=(req,res)=>{
    req.logout( (err) => {

        if (err) { return next(err); }
        req.flash( "success_msg" , "Session cerrada" );
        res.redirect( "/users/signin" );

    });
}

module.exports =userController