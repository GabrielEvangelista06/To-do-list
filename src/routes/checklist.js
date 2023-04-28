import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  console.log('Olá');
  res.send();
});

router.post('/', (req, res) => {
  console.log(req.body);
  res.status(200).send(req.body);
});

router.get('/:id', (req, res) => {
  console.log(req.params.id);
  res.send(`ID: ${req.params.id}`);
});

router.put('/:id', (req, res) => {
  console.log(req.params.id);
  res.send(`PUT ID: ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
  console.log(req.params.id);
  res.send(`DELETE ID: ${req.params.id}`);
});

export default router;
