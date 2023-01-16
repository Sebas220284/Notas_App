const express = require('express');
const exphbs = require('express-handlebars');
//const { extname } = require('path');
const path = require('path');
const morgan = require('morgan')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session=require('express-session');
//const { nextTick } = require('process');

const passport=require('passport');


//inicalizaciones
const app = express();
require('./config/passport')


//settings
app.set('port', process.env.PORT || 4000);
app.set('host',process.env.HOST || '0.0.0.0')
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));



app.set('view engine', '.hbs')

//middlewares

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))
app.use(session({secret:'puto',
resave:true,
saveUninitialized:true
}))
app.use(passport.initialize())
app.use(passport.session())


app.use(flash())


//global variables
app.use((req,res,next)=>{
res.locals.success_msg=req.flash('success_msg')
res.locals.error_msg=req.flash('error_msg')
//res.locals.error_ms=req.flash('error_ms')
res.locals.error=req.flash('error')
res.locals.user=req.user||null
    next()
})


//routes
/*app.get('/',(req,res)=>{
    res.render('index')
})*/
app.use(require('./routes/index.routes'))
app.use(require('./routes/node.routes'))
app.use(require('./routes/users.routes'))

//static files
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;