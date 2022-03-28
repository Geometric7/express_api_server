const express = require('express');
const router = express.Router();
const {
  v4: uuidv4
} = require('uuid');
const db = require('../db');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  const item = db.seats.filter((item) => item.id == req.params.id);
  res.json(item);
});

router.route('/seats').get((req, res) => {
  const newSeat = {
    id: uuidv4(),
    day: req.params.day,
    seat: req.params.seat,
    client: req.params.client,
    email: req.params.email,
  }
  db.seats.push(newSeat);
});

router.route('/seats/:id').put((req, res) => {
  const choosenSeat = db.seats.filter((item) => item.id == req.params.id);
  const indexOf = db.seats.indexOf(choosenSeat);
  const editedSeat = {
    ...choosenSeat,
    id: uuidv4(),
    day: req.params.day,
    seat: req.params.seat,
    client: req.params.client,
    email: req.params.email,
  }
  db[indexOf] = editedSeat;
  res.json({
    message: 'OK'
  })
});

router.route('/seats/:id').delete((req, res) => {
  const choosenSeat = db.seats.filter((item) => item.id == req.params.id);
  const indexOf = db.seats.indexOf(choosenSeat);
  db.seats.slice(indexOf, 1);
  res.json({
    message: 'OK'
  });
});

module.exports = router;
