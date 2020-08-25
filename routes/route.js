const authroute             = require('./route/authentication.route')
const courseMgt             = require('./route/courses.route')

module.exports = (app) => {
    app.use('/api/course', courseMgt)
    app.use('/api/auth',   authroute)
}