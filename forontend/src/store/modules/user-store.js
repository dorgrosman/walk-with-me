import { userService } from "../../services/user-service.js";

var defaultUser = {
    _id: "5fc531cfba5fd6d904aad38a",
    name: "Charlie McBride",
    favoriteTrips: [
        {
            _id: "5fc538bcba5fd6d904aad393",
            "name": "Switzerland Mountains",
            "date": 9898989
        },
        {
            _id: "5fc538bcba5fd6d904aad392",
            name: "Scotland Heights",
            date: 9898989
        },
        {
            _id: "5fc538bcba5fd6d904aad397",
            name: "Tuscany Vineyards",
            date: 9898989
        }
    ],
    profileImgUrl: "user1.jpeg",
    isGuide: false,
    guideInfo: {
        rate: "",
        description: "",
        lang: [],
        reviews: []
    },
    isLogin: false,
}
var defaultGuide = {

    _id: "5fc531cfba5fd6d904aad389",
    name: "Arnold Wellington",
    favoriteTrips: [],
    profileImgUrl: "",
    isGuide: true,
    guideInfo: {
        rate: "",
        description: "professional guide, with great vibes",
        lang: [
            "English",
            "Hebrew",
            "Welsh"
        ],
        reviews: [
            {
                id: "r101",
                txt: "A great guide to hike with..",
                rate: 5,
                reviewByUser: {
                    _id: "5fc531cfba5fd6d904aad38a",
                    userName: "Charlie McBride",
                    imgUrl: "img.jpg"
                }
            }
        ]
    }
}

// import store from "../index.js";


var localLoggedinUser = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);
// else {

//     userService.login({ name: "Charlie McBride", password: "123456" })
//         .then(user => localLoggedinUser = user)
//     // .then(context.commit({ type: 'setUser', localLoggedinUser }))


// }

export const userStore = {
    strict: true,
    state: {
        users: [],
        loggedinUser: localLoggedinUser,
        loggedinGuide: defaultGuide,
        favoriteTrips: [],
        // isGuide: false,
        reviews: [],
        guideRate: null,
        isLogin: false,
    },
    getters: {
        loggedinUser(state) {
            return state.loggedinUser
        },
        loggedinGuide(state) {
            return state.loggedinGuide
        },
        isGuide(state) {
            return state.isGuide
        },
        guidesForDisplay(state) {
            return state.users.filter(user => user.isGuide === true)
        },
        reviews(state) {
            return state.reviews
        },

        isLogin(state) {
            return state.isLogin;
        },
        // getGuideRate(state) {
        //     return state.guideRate
        // }
    },
    mutations: {
        setUser(state, { user }) {

            state.loggedinUser = user;
        },
        setUsers(state, { users }) {
            state.users = users;
        },
        setReviews(state, { reviews }) {
            state.reviews = reviews;
        },
        addReview(state, { review }) {
            state.reviews.push(review)
        },
        setGuideRate(state, { rate }) {
            state.guideRate = rate
        },
        setLoginSignUp(state, { action }) {
            if (action === 'login') state.isLogin = true;
            else state.isLogin = false;
        },
        // updateUser(state, { user }) {
        //     const idx = state.users.findIndex(prd => prd._id === user._id);
        //     if (idx >= 0) state.trips.splice(idx, 1, trip);
        // },

    },
    actions: {
        async login(context, { userCred }) {
            const user = await userService.login(userCred);
            context.commit({ type: 'setUser', user })
            return user;
        },

        async signup(context, { userCred }) {
            const user = await userService.signup(userCred)
            context.commit({ type: 'setUser', user })
            return user;
        },
        async logout(context) {
            await userService.logout()
            context.commit({ type: 'setUsers', users: [] })
            context.commit({ type: 'setUser', user: null })
        },
        async loadUsers(context) {
            const users = await userService.getUsers();
            context.commit({ type: 'setUsers', users })
        },
        async updateUser(context, { user }) {
            user = await userService.updateUser(user);
            context.commit({ type: 'setUser', user })
        },
        async loadReviews(context, { guideId }) {
            const user = await userService.getUserById(guideId);
            const reviews = user.guideInfo.reviews
            context.commit({ type: 'setReviews', reviews })
        },
        async saveReview({ commit }, { review, guideId, user }) {

            const guide = await userService.getUserById(guideId);
            const sum = guide.guideInfo.reviews.reduce(
                (acc, item) => acc + item.rate,
                0
            );
            const avg = sum / guide.guideInfo.reviews.length;
            guide.guideInfo.rate = avg.toFixed(1)

            const savedReview = await userService.saveReview(review, guide)
            commit({ type: 'addReview', review })
        },

        async toggleFavs(context, { trip }) {
            const userCopy = JSON.parse(JSON.stringify(context.state.loggedinUser));
            let userFavs = userCopy.favoriteTrips;
            let isFav = userFavs.some((userFav) => userFav._id.includes(trip._id));
            if (isFav) {
                const idx = userFavs.findIndex((fav) => fav._id === trip._id);
                if (idx >= 0) {
                    userFavs.splice(idx, 1);
                }
            } else {
                userFavs.unshift({
                    date: trip.date,
                    name: trip.name,
                    _id: trip._id
                });
            }
            await context.dispatch({ type: 'updateUser', user: context.state.loggedinUser });

            context.commit({ type: 'setUser', user: userCopy });
        },
        async getGuideRate(context, { tripGuideId }) {
            const guide = await userService.getUserById(tripGuideId)
            const rate = guide.guideInfo.rate;
            return rate
        },
        async getRateTotal(context, { tripGuideId }) {
            const guide = await userService.getUserById(tripGuideId)
            const total = guide.guideInfo.totalReviewCount
            return total
        },
        loadDefaultUser({ getters, commit }) {
        commit({ type: 'setIsLoading', isLoading: true })

            const userLogged = this.$store.getters.loggedinUser
            commit({ type: 'setUser', userLogged })
            commit({ type: 'setIsLoading', isLoading: false })
        }
    }
}