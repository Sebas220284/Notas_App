const{Router}=require('express')



const{renderSignupForm, signup, renderSigninForm, signin, logout}= require('../controllers/user.controller')
const router = Router();

router.get('/users/signub',renderSignupForm)


router.post('/users/signub',signup)

router.get('/users/signin',renderSigninForm)

router.post('/users/signin',signin)

router.get('/users/logout',logout)
module.exports=router;
