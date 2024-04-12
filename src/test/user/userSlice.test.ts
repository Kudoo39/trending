// /* eslint-disable no-undef */
// import { User, UserCredential, UserRegister } from '../../misc/type'
// import userReducer, {
//   logout,
//   loginUserAsync,
//   registerUserAsync,
//   authenticateUserAsync
// } from '../../redux/slices/userSlice'

// type InitialState = {
//   users: User[]
//   user?: User | null
//   loading: boolean
//   error: string | null
//   isAuthenticated: boolean
// }

// describe('userSlice reducers', () => {
//   test('should log out from the account', () => {
//     const initialState: InitialState = {
//       users: [],
//       user: {
//         id: 1,
//         email: 'user1@mail.com',
//         name: 'User 1',
//         role: 'admin',
//         avatar: 'https://i.imgur.com/LDOO4Qs.jpg',
//         password: 'password1'
//       },
//       loading: false,
//       error: null,
//       isAuthenticated: true
//     }

//     const action = logout()
//     const nextState = userReducer(initialState, action)

//     expect(nextState.user).toBeNull
//     expect(nextState.isAuthenticated).toBeFalsy()
//   })

//   // test 0: initial state
//   test('should return initial state', () => {
//     const initialState: InitialState = {
//       users: [],
//       loading: false,
//       error: null,
//       isAuthenticated: false
//     }

//     const nextState = userReducer(undefined, { type: '' })

//     expect(nextState).toEqual(initialState)
//   })

//   // test 1: register fulfill
//   test('should register an account', () => {
//     const initialState: InitialState = {
//       users: [],
//       user: null,
//       loading: false,
//       error: null,
//       isAuthenticated: false
//     }

//     const registerUser: UserRegister = {
//       email: 'user2@mail.com',
//       name: 'User 2',
//       password: 'password2',
//       avatar: 'https://i.imgur.com/LDOO4Qs.jpg'
//     }

//     const action = registerUserAsync.fulfilled(registerUser, 'fulfilled', registerUser)
//     const nextState = userReducer(initialState, action)

//     expect(nextState.user).toEqual(registerUser)
//     expect(nextState.loading).toBe(false)
//     expect(nextState.error).toBeNull()
//     expect(nextState.isAuthenticated).toBeFalsy()
//   })

//   // test 2: register pending
//   test('should have loading truthy when fetch is pending', () => {
//     const initialState: InitialState = {
//       users: [],
//       user: null,
//       loading: false,
//       error: null,
//       isAuthenticated: false
//     }

//     const registerUser: UserRegister = {
//       email: 'user3@mail.com',
//       name: 'User 3',
//       password: 'password3',
//       avatar: 'https://i.imgur.com/LDOO4Qs.jpg'
//     }

//     const action = registerUserAsync.pending('pending', registerUser)
//     const nextState = userReducer(initialState, action)

//     expect(nextState.user).toBeNull
//     expect(nextState.loading).toBe(true)
//     expect(nextState.error).toBeNull()
//     expect(nextState.isAuthenticated).toBeFalsy()
//   })

//   // test 3: register error
//   test('should have error', () => {
//     const initialState: InitialState = {
//       users: [],
//       user: null,
//       loading: false,
//       error: null,
//       isAuthenticated: false
//     }

//     const registerUser: UserRegister = {
//       email: 'user3@mail.com',
//       name: 'User 3',
//       password: 'password3',
//       avatar: 'https://i.imgur.com/LDOO4Qs.jpg'
//     }

//     const error = new Error('error')
//     const action = registerUserAsync.rejected(error, 'error', registerUser)
//     const nextState = userReducer(initialState, action)

//     expect(nextState.user).toBeNull
//     expect(nextState.loading).toBe(false)
//     expect(nextState.error).toEqual(error.message)
//     expect(nextState.isAuthenticated).toBeFalsy()
//   })

//   // test 4: login fulfill
//   test('should login an account', () => {
//     const initialState: InitialState = {
//       users: [],
//       user: null,
//       loading: false,
//       error: null,
//       isAuthenticated: false
//     }

//     const loginUser: UserCredential = {
//       email: 'user4@mail.com',
//       password: 'password4'
//     }

//     const successfulLoginUser: User = {
//       ...loginUser,
//       id: 1,
//       name: 'User 4',
//       role: 'customer',
//       avatar: 'https://i.imgur.com/LDOO4Qs.jpg'
//     }

//     const action = loginUserAsync.fulfilled(successfulLoginUser, 'fulfilled', loginUser)
//     const nextState = userReducer(initialState, action)

//     expect(nextState.user).toEqual(successfulLoginUser)
//     expect(nextState.loading).toBe(false)
//     expect(nextState.error).toBeNull()
//     expect(nextState.isAuthenticated).toBeFalsy()
//   })

//   // test 5: authenticate fulfill
//   test('should authenticate an account', () => {
//     const initialState: InitialState = {
//       users: [],
//       user: null,
//       loading: false,
//       error: null,
//       isAuthenticated: false
//     }

//     const authenticationData: User = {
//       id: 1,
//       email: 'user5@mail.com',
//       name: 'User 5',
//       role: 'customer',
//       avatar: 'https://i.imgur.com/LDOO4Qs.jpg',
//       password: 'password5'
//     }

//     const action = authenticateUserAsync.fulfilled(authenticationData, 'fulfilled', 'fulfilled')
//     const nextState = userReducer(initialState, action)

//     expect(nextState.user).toEqual(authenticationData)
//     expect(nextState.loading).toBe(false)
//     expect(nextState.error).toBeNull()
//     expect(nextState.isAuthenticated).toBeTruthy()
//   })
// })
