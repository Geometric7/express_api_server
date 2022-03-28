const express = require('express');
const { v4: uuidv4 } = require('uuid')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/:id', (req, res) => {
  const item = db.filter((item) => item.id == req.params.id);
  res.json(item);
});

app.get('/testimonials/random', (req, res) => {
  let item = db[Math.floor(db.length * Math.random(req.params.id))];
  res.json(item);
});

app.post ('/testimonials', (req, res) => {
  const newTestimonial = {
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text
  };
  db.push(newTestimonial);
  res.json({message: 'OK'});
});

app.put('/testimonials/:id', (req, res) => {
  const choosenTestimonial = db.filter((item) => item.id === req.params.id);
  const indexOf = db.indexOf(choosenTestimonial);
  const editedTestimonial = {
    ...choosenTestimonial,
    author: req.body.author,
    text: req.body.text,
  }
  db[indexOf] = editedTestimonial;
  res.json({message: 'OK'});
});

app.delete('testimonials/:id', (req, res) => {
  const choosenTestimonial = db.filter((item) => item.id === req.params.id);
  const indexOf = db.indexOf(choosenTestimonial);
  db.splice(indexOf, 1);
  res.json({message: 'OK'});
})

app.use((req, res) => {
  res.status(404).json({message: 'Not Found'});
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
}); 
