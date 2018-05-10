const express = require('express')
const cors = require('cors')
const axios = require('axios')
const parser = require('body-parser')
const mongoose = require('./db/schema')

const app = express()
const Schedule = mongoose.model('Schedule')

app.use(cors())
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

app.get('/api/courses', (req, res) => {
	axios
		.get('http://localhost:5000/api/courses/c.json?semester=1')
		.then(courses => res.json(courses.data))
		.catch(err => console.log(err))
})

app.get('/api/courses/:id', (req, res) => {
	axios
		.get(`http://localhost:5000/api/course/${req.params.id}`)
		.then(course => res.json(course.data))
		.catch(err => console.log(err))
})

app.get('/api/schedules', (req, res) => {
	Schedule.find()
		.then(schedules => res.json(schedules))
		.catch(err => console.log(err))
})

app.post('/api/schedules', (req, res) => {
	// let courseIds = req.body.map(course => course.id.toString()).join(',')
	// let endpoint = 'http://localhost:5000/schedules?courses=' + courseIds
	//
	// axios
	// 	.post(endpoint)
	// 	.then(schedule => res.json(schedule))
	// 	.catch(err => console.log(err))

	// post to temp mongo db
	let schedule = {
		courses: req.body.map(course => course.id),
		name: 'unnamed schedule'
	}

	Schedule.create(schedule)
		.then(res => console.log(res))
		.catch(err => console.log(err))
})

app.delete('/api/schedules/:id', (req, res) => {
	Schedule.findByIdAndRemove(req.params.id)
		.then(res => console.log(res))
		.catch(err => console.log(err))
})

app.put('/api/schedules/:id', (req, res) => {
	Schedule.findByIdAndUpdate(req.params.id, {
		name: req.body.name
	})
		.then(res => console.log(res))
		.catch(err => console.log(err))
})

app.listen(process.env.PORT || 3001, function() {
	console.log('up and running!')
})
