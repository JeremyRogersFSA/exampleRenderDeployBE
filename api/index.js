const express = require('express')
const router = express.Router()

// GET /api/health
router.get('/health', async (req, res, next) => {})

// ROUTER: /api/users
const usersRouter = require('./users')
router.use('/users', usersRouter)

// ROUTER: /api/activities
const activitiesRouter = require('./activities')
router.use('/activities', activitiesRouter)

// GET /api/activities/:activityId/routines
// router.get('/activities/:activityId/routines')
// GET /api/activities
// router.get('/activities')

// POST /api/activities

// PATCH /api/activities/:activityId

// ROUTER: /api/routines
const routinesRouter = require('./routines')
router.use('/routines', routinesRouter)

// ROUTER: /api/routine_activities
const routineActivitiesRouter = require('./routineActivities')
router.use('/routine_activities', routineActivitiesRouter)

module.exports = router
