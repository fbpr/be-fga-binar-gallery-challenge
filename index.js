const express = require('express')
const app = express();
const router = require('./routes');
const morgan = require('morgan');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/api', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});