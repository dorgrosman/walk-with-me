import { tripService } from '../../services/trip-service.js';



export const tripStore = {
    strict: true,
    state: {
        isLoading: false,
        trips: [],
        filterBy: {
            name: "",
            type: "",
            region: "",
        },
        isShowAll: false,
        showBy: null,
        currTrip: {}
    },
    getters: {
        tripsForDisplay(state) {
            return state.trips
        },
        mountainTripsForDisplay(state) {
                const mountainTrips = state.trips.filter(trip => trip.type === "mountain")
                return mountainTrips.slice(0, 4)
        },
        forestTripsForDisplay(state) {
            const forestTrips = state.trips.filter(trip => trip.type === "forest")
            return forestTrips.slice(0, 4)
        },
        cityTripsForDisplay(state) {
            const cityTrips = state.trips.filter(trip => trip.type === "city")
            let random = cityTrips.sort(() => .5 - Math.random()).slice(0,4)
            return random
        },
        difficultTripsForDisplay(state) {
                const extremeTrips = state.trips.filter(trip => trip.difficulty >= 4)
                return extremeTrips.slice(0, 4)
        },
        europeTripsForDisplay(state) {
                const europeTrips = state.trips.filter(trip => trip.region === "Europe")
                let random = europeTrips.sort(() => .5 - Math.random()).slice(0,4)
            return random
        },
        usaTripsForDisplay(state) {
            if (state.showBy === "USA" && state.isShowAll === true) {
                return state.trips.filter(trip => trip.region === "USA")
            } else {
                const europeTrips = state.trips.filter(trip => trip.region === "USA")
                return europeTrips.slice(0, 4)
            }
        },
        getTripsByGuide(state) {
            return state.trips.filter(trip => trip.aboutGuide._id === state.guideId)
        },
        filterBy(state) {
            return state.filterBy
        }
    },
    mutations: {
        setFilterBy(state, { filterBy }) {
            state.filterBy = filterBy
        },
        setTrips(state, { trips }) {
            state.trips = trips
        },
        setIsLoading(state, payload) {
            state.isLoading = payload.isLoading
        },
        addTrip(state, { trip }) {
            state.trips.push(trip)
        },

        setGuideId(state, { guideId }) {
            state.guideId = guideId
        },
        updateTrip(state, { trip }) {
            const idx = state.trips.findIndex(prd => prd._id === trip._id);
            if (idx >= 0) state.trips.splice(idx, 1, trip);
        },
        showByParams(state, { showBy }) {
            state.isShowAll = !state.isShowAll
            state.showBy = showBy
        }
    },
    actions: {
        async loadTrips({ getters, commit }) {
            
            const trips = await tripService.query(getters.filterBy)
            let types = {};
            trips.forEach(trip => {
                if (!types[trip.type]) types[trip.type] = trip.type
            });
            commit({ type: 'setTrips', trips })
        },
        async saveTrip({ commit }, { trip }) {
            const actionType = (trip._id) ? 'addTrip' : 'updateTrip';
            const savedTrip = await tripService.save(trip);
            commit({ type: actionType, trip: savedTrip })
            
        },
        // async removeTrip({ commit }, payload) {
        //     await tripService.remove(payload.tripId)
        //     commit(payload)
        // },
        async updateTotalBooked({ commit }, { id, totalBooked }) {
            const trip = await tripService.getTripById(id);
            const tripCopy = JSON.parse(JSON.stringify(trip))
            tripCopy.totalBooked = totalBooked;
            const savedTrip = await tripService.save(tripCopy);
            commit({ type: 'updateTrip', trip: savedTrip })
        },
     

    }
}