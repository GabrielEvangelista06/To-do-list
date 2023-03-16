const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('<h1>My to do list</h1>');
});

app.listen(port, () => {
  console.log(`Server is listening in port ${port}`);
});
