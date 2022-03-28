const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
  const item = db.testimonials.filter((item) => item.id == req.params.id);
  res.json(item);
});

router.route('/testimonials/random').get((req, res) => {
  let item = db.testimonials[Math.floor(db.testimonials.length * Math.random(req.params.id))];
  res.json(item);
});

router.route('/testimonials').post((req, res) => {
  const newTestimonial = {
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text
  };
  db.testimonials.push(newTestimonial);
  res.json({
    message: 'OK'
  });
});

router.route('/testimonials/:id').put((req, res) => {
  const choosenTestimonial = db.testimonials.filter((item) => item.id == req.params.id);
  const indexOf = db.testimonials.indexOf(choosenTestimonial);
  const editedTestimonial = {
    ...choosenTestimonial,
    author: req.body.author,
    text: req.body.text,
  }
  db[indexOf] = editedTestimonial;
  res.json({
    message: 'OK'
  });
});

router.route('/testimonials/:id').delete((req, res) => {
  const choosenTestimonial = db.testimonials.filter((item) => item.id == req.params.id);
  const indexOf = db.testimonials.indexOf(choosenTestimonial);
  db.testimonials.splice(indexOf, 1);
  res.json({
    message: 'OK'
  });
});

module.exports = router;
