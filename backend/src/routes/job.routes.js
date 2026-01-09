const router = require('express').Router();
const controller = require('../controllers/job.controller');

router.post('/', controller.createJob);
router.get('/', controller.getJobs);
router.get('/:id', controller.getJobById);
router.post('/run-job/:id', controller.runJob);

module.exports = router;
