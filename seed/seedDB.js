const mongoose = require('mongoose')
const Cake = require('../routes/models/cakeModel')
const cakeSeed = require('./cakeSeed.json')
require('dotenv').config()

const seedFunc = async () => {
    try {
        const data = await Cake.create(cakeSeed)
        console.log(`${data.length} records created`)
        await mongoose.disconnect()
        console.log('MongoDB Disconnected')
        process.exit(0)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}, () => {
    mongoose.connection.db.dropDatabase()
}).then(() => {
    console.log('MongoDB Connected')
    seedFunc()
}).catch(err => {
    console.log(`MongoDB Error: ${err}`)
})