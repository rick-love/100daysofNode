const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

////////////////
// GET ALL TOURS
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
});

/////////////////
// GET Tour by ID
app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1; // This is need to convert the id in the URL to a number
  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid Id' });
  }

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
});

////////////////
// POST Tour
app.post('/api/v1/tours', (req, res) => {
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign(
    {
      // Using Object.assign merges the ID and Req.body.
      id: newID,
    },
    req.body
  );
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

////////////////
// PATCH Tour (Used when we only send the updated properties not the full object)
app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid Id' });
  }
  
  res.status(200).json({
    status: 'success',
    data: { tour: 'Updated Tour' },
  });
});

////////////////
// DELETE Tour
app.delete('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid Id' });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});










const port = 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});

