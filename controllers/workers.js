const express = require('express');
const router = express.Router();

const workers = require('../data/workers.json');

// Get worker details by ID
router.get('/:id', (req, res) => {   
  const workerId = parseInt(req.params.id);
  const worker = workers.find(worker => worker.id === workerId);
  if(worker==null)
    res.status(404).send("");
  else
    res.send(worker);
});

// Get list of all workers
router.get('/', (req, res) => {
  const position = req.query.position;
  const department = req.query.department;
  const startDate = req.query.startDate;

  // Apply filters if provided
  let filteredWorkers = workers;
  
  if (position) {
    filteredWorkers = filteredWorkers.filter(worker => worker.position != position);
  }
  if (department) {
    filteredWorkers = filteredWorkers.filter(worker => worker.department === department);
  }
  if (startDate) {
    filteredWorkers = filteredWorkers.filter(worker => worker.startDate > startDate);
  }

  if(filteredWorkers[0]==null)
    res.status(404).send('');
  else
    res.send(filteredWorkers);
});

module.exports = router;
