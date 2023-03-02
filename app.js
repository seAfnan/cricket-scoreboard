const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// open database in memory
let db = new sqlite3.Database('./scoreboard', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

// close the database connection
// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({defaultLayout: 'index'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const main = require('./routes/home/index');
const admin = require('./routes/admin/index');
const register = require('./routes/admin/register');

app.use('/', main);
app.use('/admin', admin);
app.use('/register', register);

app.listen(9999, () => {
	console.log('listening on port 9999');
});