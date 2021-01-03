const dbService = require('../../services/db.service');
const bookingService = require('../booking/booking.service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
	query,
	getById,
	remove,
	update,
	add,
};

async function query(filterBy = {}) {
	
	const criteria = _buildCriteria(filterBy);

	const sort = { [filterBy.sort]: 1 };
	const collection = await dbService.getCollection('trip');
	try {
		// const trips = await collection.find(criteria)._addSpecial("$orderby", { price : -1 } ).toArray();
		const trips = await collection.find(criteria).sort(sort).toArray();
		// return _sortTrips(trips, filterBy)
		
		// console.log('trips:', trips)
		return trips;
	} catch (err) {
		console.log('ERROR: cannot find trips');
		throw err;
	}
}

async function getById(tripId) {
	const collection = await dbService.getCollection('trip');
	try {
		const trip = await collection.findOne({ _id: ObjectId(tripId) });
		return trip;
	} catch (err) {
		console.log(`ERROR: while finding trip ${tripId}`);
		throw err;
	}
}

async function remove(tripId) {
	const collection = await dbService.getCollection('trip');
	try {
		await collection.deleteOne({ _id: ObjectId(tripId) });
	} catch (err) {
		console.log(`ERROR: cannot remove trip ${tripId}!!`);
		throw err;
	}
}

async function update(trip) {
	// console.log('trip:', trip)
	
	const collection = await dbService.getCollection('trip');
	console.log('collection:', collection)
	
	trip._id = ObjectId(trip._id);
	// console.log('trip._id:', trip._id)
	

	try {
		// await collection.replaceOne({ _id: trip._id }, { $set: trip });
		await collection.updateOne({ _id: trip._id }, { $set: trip });
		// console.log('tripppp:', trip)
		return trip;
	} catch (err) {
		console.log(`ERROR: cannot update trip ${trip._id}`);
		throw err;
	}
}

async function add(trip) {
	const collection = await dbService.getCollection('trip');
	try {
		await collection.insertOne(trip);
		return trip;
	} catch (err) {
		console.log(`ERROR: cannot insert trip`);
		throw err;
	}
}

function _buildCriteria(filter) {
	const criteria = {};
	if (filter.name) criteria.name = { $regex: filter.name };
	if (filter.type) criteria.type = filter.type;
	if (filter.region) criteria.region = filter.region;
	console.log('criteria????',criteria);
	return criteria;
}
