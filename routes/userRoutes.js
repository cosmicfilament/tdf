'use strict';

/**
    * @file 
    * @author John Butler
    * @module 
*/

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	res.send({ message: 'called user route' });
});

module.exports = router;
