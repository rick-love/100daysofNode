const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// ROUTES

// Check if ID is Valid
exports.checkID = (req, res, next, val) => {
  console.log(`Tour ID is: ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid Id' });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  let body = req.body;
  if (!body.name || !body.price) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'Missing Name or Price in Body' });
  }
  next();
};

// Check if Body contains Name and Price Values

// GET ALL TOURS
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: tours.length,
    data: {
      tours,
    },
  });
};

// GET Tour by ID
exports.getTour = (req, res) => {
  const id = req.params.id * 1; // This is need to convert the id in the URL to a number
  const tour = tours.find((tour) => tour.id === id);

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

// POST Tour
exports.createTour = (req, res) => {
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
};

////////////////
// PATCH Tour (Used when we only send the updated properties not the full object)
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { tour: 'Updated Tour' },
  });
};
////////////////
// DELETE Tour
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
