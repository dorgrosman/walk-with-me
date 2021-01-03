import { httpService } from './http-service.js'
const baseUrl = 'http://localhost:3030';

export const userService = {
    login,
    logout,
    signup,
    getUserById,
    getUsers,
    saveReview,
    updateUser,
}

async function getUserById(userId) {
    return httpService.get(`user/${userId}`)
}

async function saveReview(review, guide) {
    guide.guideInfo.reviews.push(review)
    updateUser(guide);
}

async function getUsers() {
    return httpService.get('user')
}

async function updateUser(user) {
    return httpService.put(`user/${user._id}`, user)
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    return _handleLogin(user)
}
async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    return _handleLogin(user)
}
async function logout() {
    await httpService.post('auth/logout');
    sessionStorage.clear();
}

function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}