const mongoose = require('./connection')

const ScheduleSchema = new mongoose.Schema({
	courses: Array,
	name: String
})

const Schedule = mongoose.model('Schedule', ScheduleSchema)

module.exports = Schedule
