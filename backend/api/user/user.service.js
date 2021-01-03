
const dbService = require('../../services/db.service')
const bookingService = require('../booking/booking.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByName,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('user')
    try {
        const users = await collection.find(criteria).toArray();
        users.forEach(user => delete user.password);

        return users
    } catch (err) {
        console.log('ERROR: cannot find users')
        throw err;
    }
}

async function getById(userId) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({ '_id': ObjectId(userId) })
        delete user.password
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${userId}`)
        throw err;
    }
}
async function getByName(name) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({ name })
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${name}`)
        throw err;
    }
}

async function remove(userId) {
    const collection = await dbService.getCollection('user')
    try {
        await collection.deleteOne({ '_id': ObjectId(userId) })
    } catch (err) {
        console.log(`ERROR: cannot remove user ${userId}`)
        throw err;
    }
}

async function update(user) {
    const collection = await dbService.getCollection('user')
    user._id = ObjectId(user._id);

    try {
        await collection.updateOne({ _id: user._id }, { $set: user })
        return user
    } catch (err) {
        console.log(`ERROR: cannot update user ${user._id}`)
        throw err;
    }
}

async function add(user) {
    console.log('user:', user)
    const collection = await dbService.getCollection('user')
    try {
        user.favoriteTrips = [],
        user.profileImgUrl = "profile-pic.png",
        user.isGuide = false,
        await collection.insertOne(user);
        return user;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.txt) {
        criteria.username = filterBy.txt
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: +filterBy.minBalance }
    }
    return criteria;
}


