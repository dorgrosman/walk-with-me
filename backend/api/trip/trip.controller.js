const tripService = require('./trip.service')
const logger = require('../../services/logger.service')

async function getTrip(req, res) {
    const trip = await tripService.getById(req.params.id)
    res.send(trip)
}
  
async function getTrips(req, res) {
    
    const trips = await tripService.query(req.query)
    logger.debug(trips);
    res.send(trips)
}

async function deletetTrip(req, res) {
    await tripService.remove(req.params.id)
    res.end()
}

async function updateTrip(req, res) {
    const trip = req.body;
    await tripService.update(trip)
    res.send(trip)
}

async function addTrip(req, res) {
    console.log('hiiii');
    const trip = req.body;
    await tripService.add(trip)
    res.send(trip)
}

module.exports = {
    getTrip,
    getTrips,
    deletetTrip,
    updateTrip,
    addTrip
}