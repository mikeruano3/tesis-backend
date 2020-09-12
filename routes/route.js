const authroute             = require('./route/authentication.route')
const courseMgt             = require('./route/courses.route')
const collectionMgt         = require('./route/generic.route')
const select                = require("../controllers/generic/schemaSelector.middleware");

module.exports = (app) => {
    app.use('/api/course', courseMgt)
    app.use('/api/auth',   authroute)
    app.use('/api/collections/:schemaId', select.findSchema, collectionMgt)
}