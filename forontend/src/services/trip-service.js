import { httpService } from './http-service.js';
import axios from 'axios'


const baseUrl = 'http://localhost:3030';


export const tripService = {
    query,
    getTripById,
    // remove,
    save,
    getEmptyTrip
}


function query(filterBy = {}) {
    const queryParams = new URLSearchParams()
    if (filterBy) {
        queryParams.append('name',filterBy.name )
        queryParams.append('type',filterBy.type )
        queryParams.append('region',filterBy.region )
    }
    return httpService.get(`trip?${queryParams}`)
}

async function getTripById(tripId) {
    return httpService.get(`trip/${tripId}`)
}


function save(trip) {
    const savedTrip = trip._id ? _update(trip) : _add(trip)
    return savedTrip
}

async function _add(trip) {
    return httpService.post(`trip`, trip)
}

async function _update(trip) {
    return httpService.put(`trip/${trip._id}`, trip)
}

function getEmptyTrip() {
    return {
        name: '',
        price: '',
        difficulty: '',
        totalBooked: 0,
        type: '',
        imgUrls: [
            'default1.jpeg'
        ],
        createdAt: new Date(),
    }
}




















