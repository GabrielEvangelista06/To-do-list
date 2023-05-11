const express = require('express');
require('./config/database');
const checklistRouter = require('./src/routes/checklist');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/checklists', checklistRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
