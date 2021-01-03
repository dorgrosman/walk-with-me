const logger = require('../../services/logger.service')
const bookingService = require('./booking.service')

// TODO: needs error handling! try, catch

async function getBookings(req, res) {
    try {
        const bookings = await bookingService.query(req.query)
        res.send(bookings)
    } catch (err) {
        logger.error('Cannot get bookings', err);
        res.status(500).send({ error: 'cannot get bookings' })

    }
}

async function deleteBooking(req, res) {
    try {
        await bookingService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete booking', err);
        res.status(500).send({ error: 'cannot delete booking' })
    }
}

async function updatedBooking(req, res) {
    const booking = req.body;
    await bookingService.update(booking)
    res.send(booking)
}

async function addBooking(req, res) {
    var booking = req.body;
    // booking.byUserId = req.session.user._id;
    booking = await bookingService.add(booking)
    booking.byUser = req.session.user;
    // TODO - need to find aboutUser
    booking.aboutUser = {}
    res.send(booking)
}

module.exports = {
    getBookings,
    deleteBooking,
    addBooking,
    updatedBooking
}