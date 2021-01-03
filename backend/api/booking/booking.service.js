
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId


async function query(filterBy = {}) {
    
    const collection = await dbService.getCollection('booking')
    try {
        const bookings = await collection.find().toArray();
     
        return bookings
    } catch (err) {
        console.log('ERROR: cannot find bookings')
        throw err;
    }
}

async function update(booking) {
	// console.log('booking:', booking)
	
	const collection = await dbService.getCollection('booking');
	console.log('collection:', collection)
	
	booking._id = ObjectId(booking._id);
	// console.log('booking._id:', booking._id)
	

	try {
		// await collection.replaceOne({ _id: booking._id }, { $set: booking });
		await collection.updateOne({ _id: booking._id }, { $set: booking });
		// console.log('bookingppp:', booking)
		return booking;
	} catch (err) {
		console.log(`ERROR: cannot update booking ${booking._id}`);
		throw err;
	}
}



async function remove(bookingId) {
    const collection = await dbService.getCollection('booking')
    try {
        await collection.deleteOne({ "_id": ObjectId(bookingId) })
    } catch (err) {
        console.log(`ERROR: cannot remove booking ${bookingId}`)
        throw err;
    }
}


async function add(booking) {

    const collection = await dbService.getCollection('booking')
    try {
        await collection.insertOne(booking);
        return booking;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    return criteria;
}

module.exports = {
    query,
    remove,
    add,
    update
}


