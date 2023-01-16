const { Router } = require('express');
/*const { renderAbout } = require('../controllers/index.controller');*/


const router = Router();



const { renderNoteForm, createNewNotas, renderNotes, renderEditForm, updateNote, deletenote } = require('../controllers/node.controller')

const {isAuthenticated}=require('../helpers/auth')
//new notes

router.get('/notes/add',isAuthenticated, renderNoteForm)


router.post('/notes/new-note',isAuthenticated, createNewNotas)

//optener todas las rutas
router.get('/notes',isAuthenticated, renderNotes)

//editar notas

router.get('/notes/edit/:id',isAuthenticated, renderEditForm)


router.put('/notes/edit/:id',isAuthenticated, updateNote)

//eliminar notes

router.delete('/notes/delete/:id',isAuthenticated, deletenote)

module.exports = router;
