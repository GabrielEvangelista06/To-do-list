const express = require('express');

const checklistDepedentRoute = express.Router();
const simpleRouter = express.Router();

const Task = require('../models/TaskModel');
const Checklist = require('../models/ChecklistModel');

checklistDepedentRoute.get('/:id/tasks/new', async (request, response) => {
  try {
    let task = Task();
    response
      .status(200)
      .render('tasks/new', { checklistId: request.params.id, task: task });
  } catch (err) {
    response
      .status(422)
      .render('pages/error', { errors: 'Erro ao carregar o formulário' });
  }
});

simpleRouter.delete('/:id', async (request, response) => {
  try {
    let task = await Task.findByIdAndDelete(request.params.id);
    console.log('🚀 ~ file: task.js:25 ~ simpleRouter.delete ~ task:', task);
    let checklist = await Checklist.findById(task.checklist);
    console.log(
      '🚀 ~ file: task.js:26 ~ simpleRouter.delete ~ checklist:',
      checklist
    );
    let taskToRemove = checklist.tasks.indexOf(task._id);
    checklist.tasks.splice(taskToRemove, 1);
    checklist.save();

    response.redirect(`/checklists/${checklist._id}`);
  } catch (err) {
    console.log('🚀 ~ file: task.js:32 ~ simpleRouter.delete ~ err:', err);
    response
      .status(422)
      .render('pages/error', { errors: 'Erro ao remover uma tarefa' });
  }
});

checklistDepedentRoute.post('/:id/tasks', async (request, response) => {
  let { name } = request.body.task;
  let task = new Task({ name, checklist: request.params.id });

  try {
    await task.save();
    let checklist = await Checklist.findById(request.params.id);
    checklist.tasks.push(task);
    await checklist.save();

    response.redirect(`/checklists/${request.params.id}`);
  } catch (err) {
    let errors = err.errors;

    response.status(422).render('tasks/new', {
      task: { ...task, errors },
      checklistId: request.params.id,
    });
  }
});

simpleRouter.put('/:id', async (request, response) => {
  let task = await Task.findById(request.params.id);
  try {
    task.set(request.body.task);
    await task.save();

    response.status(200).json({ task });
  } catch (err) {
    let errors = err.errors;

    response.status(422).json({ task: { ...errors } });
  }
});

module.exports = {
  checklistDepedent: checklistDepedentRoute,
  simple: simpleRouter,
};
