const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 8000;

let db,
  dbConnectionStr =
    'mongodb+srv://xxxxx:xxxx@cluster0.rkaig.mongodb.net/athlete?retryWrites=true&w=majority',
  dbName = 'athlete';

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
  (client) => {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName);
  }
);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (request, response) => {
  db.collection('athletes')
    .find()
    .toArray()
    .then((data) => {
      response.render('index.ejs', { info: data });
    })
    .catch((error) => console.log(error));
});

app.post('/addAthlete', (request, response) => {
  db.collection('athletes')
    .insertOne(request.body)
    .then((result) => {
      console.log('Athlete added!');
      response.redirect('/');
    })
    .catch((error) => console.log(error));
});

app.delete('/deleteAthlete', (request, response) => {
  db.collection('athletes')
    .deleteOne({ cpf: request.body.cpf })
    .then((result) => {
      console.log('Athlete Deleted!');
      response.json('Athlete Deleted!');
    })
    .catch((error) => console.error(error));
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
