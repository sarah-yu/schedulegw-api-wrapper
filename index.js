const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()

app.use(cors())

app.get('/api/courses', (req, res) => {
	axios
		.get('https://schedulegw.com/api/courses/c.json?semester=8')
		.then(courses => res.json(courses.data))
		.catch(err => console.log(err))
})

app.listen(process.env.PORT || 3001, function() {
	console.log('up and running!')
})
