const express = require('express');
const { getBootcamp, getBootcamps, updateBootcamp, deleteBootcamp, createBootcamp, getBootcampsRadius} = require('../controllers/bootcamps');

const router = express.Router();

router.route('/radius/:zip/:distance').get(getBootcampsRadius);

router.route('/').get(getBootcamps).post(createBootcamp);

router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp);

module.exports = router;