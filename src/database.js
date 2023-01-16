const mongoose= require('mongoose');

const MONGODB_URI="mongodb+srv://root:milanesa2002@cluster0.r91gmys.mongodb.net/?retryWrites=true&w=majority"

//
mongoose.connect(process.env.MONGODB_URI,{
useUnifiedTopology:true,
useNewUrlParser:true


  

})
//NOTES_APP_MONGODB_DATABASE=notes-app
.then(db=>console.log('data is coneccted'))

.catch(err=> console.log(err))




//const MONGODB_URI='mongodb://localhostjkkk/notes-app'

//mongoose.connect(MONGODB_URI)
// .connect("mongodb://127.0.0.1:27017")

//.then(() => {
 // console.log("Connected to Database");
//})
//.catch((err) => {
 // console.log("Not Connected to Database ERROR! ", err);
//});