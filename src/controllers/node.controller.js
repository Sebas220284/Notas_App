

const notesCtr={}

const flash = require('connect-flash/lib/flash')
const Note= require('../models/Note')
notesCtr.renderNoteForm=(req,res)=>
{

res.render('notes/new-note')


}
notesCtr.createNewNotas=async(req,res)=>{
 const {title,description}=req.body;

const newNote=new Note({title,description})
newNote.user=req.user.id
await newNote.save()

setTimeout(()=>{

  req.flash('success_msg','NOTA AÑADIDA ')

},3000)
res.redirect('/notes')
//req.flash('success_msg','NOTA AÑADIDA ')
    //res.redirect('/notes')
}


notesCtr.renderNotes= async(req,res)=>{
 const notes=await Note.find({user:req.user.id}).lean()
 res.render('notes/all-notes',{notes})


}


notesCtr.renderEditForm= async(req,res)=>{
 const note=await Note.findById(req.params.id).lean()
if(note.user != req.user.id)
{
  req.flash('error_msg','NO ESTAS AUTORIZADO')
  return res.redirect('/notes')
}
    res.render('notes/edit-note',{note})
}


notesCtr.updateNote=async(req,res)=>{
    const {title,description}=req.body
  await Note.findByIdAndUpdate(req.params.id,{title,description})
  req.flash('success_msg','NOTA ACTUALIZADA')
    res.redirect('/notes')
}
notesCtr.deletenote=async(req,res)=>{
  await  Note.findByIdAndDelete(req.params.id)
  req.flash('success_msg','NOTA ELIMINADA')
  res.redirect('/notes')
}
module.exports=notesCtr