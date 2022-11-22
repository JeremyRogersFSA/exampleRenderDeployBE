const client = require('./client')

// database functions

// user functions
async function createUser(data) {
	try {
		const { username, password } = data
		const user = await client.query(
			`
			INSERT INTO users(username, password),
			VALUES ($1, $2)
			RETURNING *
			;
		`,
			[username, password]
		)
		delete user.password
		return user
	} catch (error) {
		console.error(error.detail)
	}
}

async function getUser(data) {
	try {
		const { username, password } = data
		const {
			rows: [user],
		} = await client.query(
			`
			SELECT * FROM users
			WHERE username=$1
			AND password=$2; 
		`,
			[username, password]
		)
		delete user.password
		return user
	} catch (error) {
		console.error(error.detail)
	}
}

async function getUserById(userId) {
	try {
		const {
			rows: [user],
		} = await client.query(
			`
			SELECT * FROM users
			WHERE id=$1
			;
		`,
			[userId]
		)
		delete user.password
		return user
	} catch (error) {
		console.error(error.detail)
	}
}

async function getUserByUsername(userName) {
	try {
		const {
			rows: [user],
		} = await client.query(
			`
			SELECT * FROM users
			WHERE username=$1
			;
		`,
			[userName]
		)
		delete user.password
		return user
	} catch (error) {
		console.error(error.detail)
	}
}

module.exports = {
	createUser,
	getUser,
	getUserById,
	getUserByUsername,
}
