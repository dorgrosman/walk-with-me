const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getTrip, getTrips, deletetTrip, updateTrip, addTrip} = require('./trip.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)


router.get('/', getTrips)
router.post('/', addTrip)
router.get('/:id', getTrip)
router.put('/:id',  updateTrip)
router.delete('/:id',   deletetTrip)

module.exports = router