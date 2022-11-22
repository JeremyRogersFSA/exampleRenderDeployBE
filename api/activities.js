const express = require('express')
const router = express.Router()
const { getAllActivities, getActivityById } = require('../db/index')

// GET /api/activities
router.get('/', async (req, res, next) => {
	try {
		//getAllActivities()
		//res.send(activities)
	} catch (error) {
		// 3 options
		// throw error
		// console.log(error)
		console.error(error)
	}
})

// POST /api/activities (*)
// Create a new activity
router.post('/', (req, res, next) => {
	try {
	} catch (error) {}
})

// PATCH /activities/:activityId (*)
// Anyone can update an activity (yes, this could lead to long term problems a la wikipedia)
router.patch('/', (req, res, next) => {
	try {
	} catch (error) {}
})

// GET /activities/:activityId/routines
// Get a list of all public routines which feature that activity
router.get('/:activityId/routines', async (req, res, next) => {
	const { activityId: id } = req.params
	try {
		//getActivityById()
		//getRoutinesByActivity()
		//res.send(routines)
	} catch (error) {}
})

module.exports = router
