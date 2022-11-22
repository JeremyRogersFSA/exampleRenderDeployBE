const { getActivityById } = require('./activities')
const client = require('./client')
const { getUserByUsername } = require('./users')

async function createRoutine(data) {
	const { creatorId, isPublic, name, goal } = data
	try {
		const routine = await client.query(
			sql`
      INSERT INTO routines("creatorId", "isPublic", name, goal)
      VALUES ("creatorId"=$1, "isPublic"=$2, name=$3, goal=$4)
      RETURNING *
      ;
    `,
			[creatorId, isPublic, name, goal]
		)
		return routine
	} catch (error) {
		console.error(error.detail)
	}
}

async function getRoutineById(id) {
	try {
		const {
			rows: [routine],
		} = await client.query(
			sql`
      SELECT * FROM routines
      WHERE id=$1
      ;
    `,
			[id]
		)
		return routine
	} catch (error) {
		console.error(error.detail)
	}
}

async function getRoutinesWithoutActivities() {
	try {
		const { rows } = await client.query(
			sql`
      SELECT * FROM routines
      ;
    `,
			[]
		)
		return rows.filter((routine) => !!routine.activities.length)
	} catch (error) {
		console.error(error.detail)
	}
}

async function getAllRoutines() {
	try {
		const { rows } = await client.query(
			sql`
    SELECT * FROM routines
    ;
  `,
			[]
		)
		return rows
	} catch (error) {
		console.error(error.detail)
	}
}

async function getAllPublicRoutines() {
	try {
		// const {rows} = await client.query(`
		// SELECT * FROM routines
		// WHERE isPublic=true
		// ;
		// `)
		// return rows

		//or
		const { rows } = await client.query(
			sql`
    SELECT * FROM routines
    ;
    `,
			[]
		)
		return rows.filter((routine) => routine.isPublic)
	} catch (error) {
		console.error(error.detail)
	}
}

async function getAllRoutinesByUser(username) {
	try {
		const user = await getUserByUsername(username)
		const { rows: routines } = await client.query(
			sql`
      SELECT * FROM routines
      WHERE "creatorId"=$1
      ;
    `,
			[user.id]
		)
		return [...routines]
	} catch (error) {
		console.error(error.detail)
	}
}

async function getPublicRoutinesByUser(username) {
	try {
		const user = await getUserByUsername(username)
		const { rows: routines } = await client.query(
			sql`
        SELECT * FROM routines
        WHERE "creatorId"=$1
        ;
      `,
			[user.id]
		)
		return [...routines].filter((routine) => routine.isActive)
	} catch (error) {
		console.error(error.detail)
	}
}

async function getPublicRoutinesByActivity(id) {
	try {
		const activity = await getActivityById(id)
		const { rows: rActivities } = await client.query(
			sql`
        SELECT * FROM routine_activities
        WHERE "activityId"=$1
        ;
      `,
			[activity.id]
		)

		// const {rows: routines} = await client.query(
		//   sql`
		//     SELECT * FROM routines
		//     WHERE id=${}
		//     ;
		//   `)
	} catch (error) {
		console.error(error.detail)
	}
}

async function updateRoutine(data) {
	const { id, ...fields } = data
	const keys = Object.keys(fields)
	const values = Object.values(fields)

	if (!keys.length) return console.error(`no fields to update`)

	const setString = keys
		.map((field, i) => {
			fieldNum = i + 1
			return `${field}=$${fieldNum}`
		})
		.join(`, `)

	try {
		const success = await client.query(
			sql`
        UPDATE routines
        SET (${setString})
        WHERE id=${id}
        RETURNING *
        ;
      `,
			values
		)

		return !!success
	} catch (error) {
		console.error(error.detail)
	}
}

async function destroyRoutine(id) {
	try {
		const success = await client.query(
			sql`
      DELETE FROM routines
      WHERE id=$1
      RETURNING *
      ;
    `,
			[id]
		)
		// check if deleted
		// const check = getRoutineById(id)
		// return !check
		// or
		return !!success
	} catch (error) {
		console.error(error.detail)
	}
}

module.exports = {
	getRoutineById,
	getRoutinesWithoutActivities,
	getAllRoutines,
	getAllPublicRoutines,
	getAllRoutinesByUser,
	getPublicRoutinesByUser,
	getPublicRoutinesByActivity,
	createRoutine,
	updateRoutine,
	destroyRoutine,
}
