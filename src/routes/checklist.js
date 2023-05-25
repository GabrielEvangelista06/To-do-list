const express = require('express');

const router = express.Router();

const Checklist = require('../models/ChecklistModel');

router.get('/', async (request, response) => {
  try {
    let checklists = await Checklist.find({});
    response.status(200).render('checklists/index', { checklists: checklists });
  } catch (err) {
    response
      .status(500)
      .render('pages/error', { error: 'Erro ao exibir as listas' });
  }
});

router.get('/new', async (request, response) => {
  try {
    let checklist = new Checklist();
    response.status(200).render('checklists/new', { checklist: checklist });
  } catch (err) {
    response
      .status(500)
      .render('pages/error', { error: 'Erro ao carregar o formulário' });
  }
});

router.get('/:id/edit', async (request, response) => {
  try {
    let checklist = await Checklist.findById(request.params.id);
    response.status(200).render('checklists/edit', { checklist: checklist });
  } catch (err) {
    response.status(500).render('pages/error', {
      err: 'Erro ao exibir a edição de lista de tarefas',
    });
  }
});

router.post('/', async (request, response) => {
  let { name } = request.body.checklist;
  let checklist = new Checklist({ name });

  try {
    await checklist.save();
    response.redirect('/checklists');
  } catch (err) {
    response
      .status(422)
      .render('checklists/new', { checklist: { ...checklist, err } });
  }
});

router.get('/:id', async (request, response) => {
  try {
    let checklist = await Checklist.findById(request.params.id);
    response.status(200).render('checklists/show', { checklist: checklist });
  } catch (err) {
    response
      .status(422)
      .render('pages/error', { error: 'Erro ao exibir as listas de tarefas' });
  }
});

router.put('/:id', async (request, response) => {
  let { name } = request.body.checklist;
  let checklist = Checklist.findById(request.params.id);

  try {
    await checklist.updateOne(checklist, { name });
    response.redirect('/checklists');
  } catch (err) {
    console.log('🚀 ~ file: checklist.js:73 ~ router.put ~ err:', err);
    let errors = err.erros;
    response
      .status(422)
      .render('pages/error', { checklist: { ...checklist, errors } });
  }
});

router.delete('/:id', async (request, response) => {
  try {
    let checklist = await Checklist.findByIdAndRemove(request.params.id);
    response.redirect('/checklists');
  } catch (err) {
    response
      .status(500)
      .render('pages/error', { error: 'Erro ao deletar a lista de tarefas' });
  }
});

module.exports = router;
