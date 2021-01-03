const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')

const saltRounds = 10

async function login(name, password) {
    logger.debug(`auth.service - login with name: ${name}`)
    if (!name || !password) throw new Error('name and password are required!')

    const user = await userService.getByName(name)
    if (!user) return Promise.reject('Invalid name or password')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid name or password')

    delete user.password;
    return user;
}


async function signup(name, password) {
    logger.debug(`auth.service - signup with name: ${name}`)
    if (!name || !password ) return Promise.reject('name, name and password are required!')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({name, password: hash})
}

module.exports = {
    signup,
    login,
}