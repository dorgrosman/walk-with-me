import { bookingService } from "../../services/booking-service.js";
import  socketService  from '../../services/socket-service.js';


export const bookingStore = {
    strict: true,
    state: {
        bookings: []
    },
    getters: {
        bookings(state) {
            return state.bookings
        }
    },
    mutations: {
        setBookings(state, { bookings }) {
            state.bookings = bookings
        },
        addBooking(state, { booking }) {
            state.bookings.push(booking)
        },
        setBooking(state, { booking }) {
            const idx = state.bookings.findIndex(prd => prd._id === booking._id)
            if (idx >= 0) state.bookings.splice(idx, 1, booking)
        },
        removeBooking(state, { booking }) {
            const idx = state.bookings.findIndex(prd => prd._id === booking._id)
            if (idx >= 0) state.bookings.splice(idx, 1);
        }
    },
    actions: {
        async loadBookings(context) {
            const bookings = await bookingService.getBookings();
            context.commit({ type: 'setBookings', bookings })
        },

        async addBooking(context, { booking }) {
            booking.user = {
                _id: context.rootGetters.loggedinUser._id,
                name: context.rootGetters.loggedinUser.name,
                imgUrl: context.rootGetters.loggedinUser.profileImgUrl,
            };
            const newBooking = await bookingService.createBooking(booking);

            // socketService.setup();
            // socketService.emit('guideId', newBooking.guide._id);
            socketService.emit('addBooking',newBooking)
            context.commit({ type: 'addBooking', booking: newBooking })
        
        },

        async updateBooking(context, { booking }) {
            
            const updatedBooking = await bookingService.updateBooking(booking)
            socketService.emit('updateBooking',updatedBooking)
            context.commit({ type: 'setBooking', booking: updatedBooking })
        },
        
        async removeBooking(context, { booking }) {
            const deletedBooking = await bookingService.remove(booking)
            context.commit({ type: 'removeBooking', booking: deletedBooking })
        }
    }
}