const Note = require('../models/note');

module.exports = {
    index,
    show,
    error,
    create,
    remove,
    edit,
    update,
    new: newNote
};

async function index(req, res) {
    try {
        const notes = await Note.find({})
        res.render('index', { 
            title: 'Welcome to NoteApp',
            notes 
        });
    } catch (error) {
        res.redirect('/error');
    }
}

async function show(req, res) {
    try {
        const note = await Note.findById(req.params.id)
        res.render('show', {
            title: `Details for: ${note.title}`,
            note
        });
    } catch (error) {
        res.redirect('/error');
    }
}

async function create(req, res) {
    try {
        await Note.create(req.body);
        res.redirect('/');
    } catch (error) {
        res.redirect('/error');
    }
}

async function remove(req, res) {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (error) {
        res.redirect('/error');
    }
}

async function edit(req, res) {
    try {
        const note = await Note.findById(req.params.id)
        res.render('edit', {
            title: `Edit details of: ${note.title}`,
            note
        });
    } catch (error) {
        res.redirect('/error');
    }
}

async function update(req, res) {
    try {
        const note = await Note.findByIdAndUpdate(req.params.id, req.body);
        res.redirect(`/notes/${req.params.id}`);
    } catch (error) {
        res.redirect('/error');
    }
}

function newNote(req, res) {
    res.render('new', {
        title: 'Create a New Note'
    });
}


function error(req, res) {
    res.render('error', {
        title: 'Something Went Wrong'
    });
}