/* eslint-disable no-undef */
import { User, UserCredential, UserRegister } from '../../misc/type'
import userReducer, {
  logout,
  loginUserAsync,
  registerUserAsync,
  authenticateUserAsync,
  fetchUsersAsync,
  updateUserProfileAsync,
  updateUserPasswordAsync
} from '../../redux/slices/userSlice'

type InitialState = {
  users: User[]
  user?: User | null
  loading: boolean
  error: string | null
  isAuthenticated: boolean
}

const initialState: InitialState = {
  users: [],
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false
}

const mockUsers: User[] = [
  {
    email: 'user1@example.com',
    password: 'password1',
    firstname: 'User',
    lastname: '1',
    avatar: 'image1',
    role: 'customer',
    _id: '1',
    orders: [],
    banStatus: false
  },
  {
    email: 'user2@example.com',
    password: 'password2',
    firstname: 'User',
    lastname: '2',
    avatar: 'image2',
    role: 'customer',
    _id: '2',
    orders: [],
    banStatus: false
  }
]

const mockSingleUser: User =
  {
    email: 'user3@example.com',
    password: 'password3',
    firstname: 'User',
    lastname: '3',
    avatar: 'image3',
    role: 'customer',
    _id: '3',
    orders: [],
    banStatus: false
  }


describe('userSlice reducers', () => {
  test('should log out from the account', () => {
    const initialState: InitialState = {
      users: [],
      user: {
        _id: '1',
        email: 'user1@mail.com',
        firstname: 'User',
        lastname: '1',
        role: 'admin',
        avatar: 'https://i.imgur.com/LDOO4Qs.jpg',
        password: 'password1',
        banStatus: false,
        orders: [
          {
            products: [
              { productId: 'product1', quantity: 2 },
              { productId: 'product2', quantity: 1 }
            ]
          }]
      },
      loading: false,
      error: null,
      isAuthenticated: true
    }

    const action = logout()
    const nextState = userReducer(initialState, action)

    expect(nextState.user).toBeNull
    expect(nextState.isAuthenticated).toBeFalsy()
  })

  // test 0: initial state
  test('should return initial state', () => {
    const initialState: InitialState = {
      users: [],
      loading: false,
      error: null,
      isAuthenticated: false
    }

    const nextState = userReducer(undefined, { type: '' })

    expect(nextState).toEqual(initialState)
  })

  // test 1: register fulfill
  test('should register an account', () => {
    const registerUser: UserRegister = {
      email: 'user2@mail.com',
      firstname: 'User',
      lastname: '2',
      password: 'password2',
      avatar: 'https://i.imgur.com/LDOO4Qs.jpg'
    }

    const action = registerUserAsync.fulfilled(registerUser, 'fulfilled', registerUser)
    const nextState = userReducer(initialState, action)

    expect(nextState.user).toEqual(registerUser)
    expect(nextState.loading).toBe(false)
    expect(nextState.error).toBeNull()
    expect(nextState.isAuthenticated).toBeFalsy()
  })

  // test 2: register pending
  test('should have loading truthy when fetch is pending', () => {
    const registerUser: UserRegister = {
      email: 'user3@mail.com',
      firstname: 'User',
      lastname: '3',
      password: 'password3',
      avatar: 'https://i.imgur.com/LDOO4Qs.jpg'
    }

    const action = registerUserAsync.pending('pending', registerUser)
    const nextState = userReducer(initialState, action)

    expect(nextState.user).toBeNull
    expect(nextState.loading).toBe(true)
    expect(nextState.error).toBeNull()
    expect(nextState.isAuthenticated).toBeFalsy()
  })

  // test 3: register error
  test('should have error', () => {
    const registerUser: UserRegister = {
      email: 'user4@mail.com',
      firstname: 'User',
      lastname: '4',
      password: 'password4',
      avatar: 'https://i.imgur.com/LDOO4Qs.jpg'
    }

    const error = new Error('error')
    const action = registerUserAsync.rejected(error, 'error', registerUser)
    const nextState = userReducer(initialState, action)

    expect(nextState.user).toBeNull
    expect(nextState.loading).toBe(false)
    expect(nextState.error).toEqual(error.message)
    expect(nextState.isAuthenticated).toBeFalsy()
  })

  // test 4: login fulfill
  test('should login an account', () => {
    const loginUser: UserCredential = {
      email: 'user5@mail.com',
      password: 'password5'
    }

    const successfulLoginUser: User = {
      ...loginUser,
      _id: '5',
      firstname: 'User',
      lastname: '5',
      role: 'customer',
      avatar: 'https://i.imgur.com/LDOO4Qs.jpg',
      banStatus: false,
      orders: [
        {
          products: [
            { productId: 'product1', quantity: 2 },
            { productId: 'product2', quantity: 1 }
          ]
        }]
    }

    const action = loginUserAsync.fulfilled(successfulLoginUser, 'fulfilled', loginUser)
    const nextState = userReducer(initialState, action)

    expect(nextState.user).toEqual(successfulLoginUser)
    expect(nextState.loading).toBe(false)
    expect(nextState.error).toBeNull()
    expect(nextState.isAuthenticated).toBeFalsy()
    expect(nextState).toEqual({
      users: [],
      user: successfulLoginUser,
      loading: false,
      error: null,
      isAuthenticated: false
    })
  })

  // test 4.1: login pending
  test('should handle loading when login an account', () => {
    const loginUser: UserCredential = {
      email: 'user5@mail.com',
      password: 'password5'
    }

    const action = loginUserAsync.pending('pending', loginUser)
    const nextState = userReducer(initialState, action)

    expect(nextState.user).toBeNull()
    expect(nextState.loading).toBe(true)
    expect(nextState.error).toBeNull()
    expect(nextState.isAuthenticated).toBeFalsy()
    expect(nextState).toEqual({
      users: [],
      user: null,
      loading: true,
      error: null,
      isAuthenticated: false
    })
  })

  // test 4.2: login error
  test('should handle loading when login an account', () => {
    const loginUser: UserCredential = {
      email: 'user5@mail.com',
      password: 'password5'
    }

    const error = new Error('error')
    const action = loginUserAsync.rejected(error, 'error', loginUser)
    const nextState = userReducer(initialState, action)

    expect(nextState).toEqual({
      users: [],
      user: null,
      loading: false,
      error: error.message,
      isAuthenticated: false
    })
  })

  // test 5: authenticate fulfill
  test('should authenticate an account', () => {
    const authenticationData: User = {
      _id: '6',
      email: 'user6@mail.com',
      firstname: 'User',
      lastname: '6',
      role: 'customer',
      avatar: 'https://i.imgur.com/LDOO4Qs.jpg',
      password: 'password6',
      banStatus: false,
      orders: [
        {
          products: [
            { productId: 'product1', quantity: 2 },
            { productId: 'product2', quantity: 1 }
          ]
        }]
    }

    const action = authenticateUserAsync.fulfilled(authenticationData, 'fulfilled', 'fulfilled')
    const nextState = userReducer(initialState, action)

    expect(nextState.user).toEqual(authenticationData)
    expect(nextState.loading).toBe(false)
    expect(nextState.error).toBeNull()
    expect(nextState.isAuthenticated).toBeTruthy()
  })
})

// test 6: fetchUsersAsync fulfill
test('should return a list of users', () => {
  const action = fetchUsersAsync.fulfilled(mockUsers, 'fulfilled')
  const nextState = userReducer(initialState, action)

  expect(nextState).toEqual({
    users: [...mockUsers],
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false
  })
})

// test 7: fetchUsersAsync pending
test('should have loading truthy when fetch is pending', () => {
  const action = fetchUsersAsync.pending('pending')
  const nextState = userReducer(initialState, action)

  expect(nextState).toEqual({
    users: [],
    user: null,
    loading: true,
    error: null,
    isAuthenticated: false
  })
})

// test 8: fetchUsersAsync error
test('should have error when fetch users', () => {
  const error = new Error('error')
  const action = fetchUsersAsync.rejected(error, 'error')
  const nextState = userReducer(initialState, action)

  expect(nextState).toEqual({
    users: [],
    user: null,
    loading: false,
    error: error.message,
    isAuthenticated: false
  })
})

// test 9: updateUserProfileAsync fulfill
test('should handle update user profile', () => {
  const initialStateWithUser = {
    ...initialState,
    users: [mockSingleUser]
  }

  const updatedUser = {
    ...mockSingleUser,
    firstname: 'User update',
    lastname: '3'
  }
  const action = updateUserProfileAsync.fulfilled(updatedUser, 'fulfilled', {
    updateUser: updatedUser,
    userId: updatedUser._id
  })
  const nextState = userReducer(initialStateWithUser, action)

  expect(nextState).toEqual({
    users: [updatedUser],
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false
  })
})

// test 10: updateUserProfileAsync pending
test('should handle loading when update user profile', () => {
  const initialStateWithUser = {
    ...initialState,
    users: [mockSingleUser]
  }

  const updatedUser = {
    ...mockSingleUser,
    firstname: 'User update',
    lastname: '3'
  }
  const action = updateUserProfileAsync.pending('pending', {
    updateUser: updatedUser,
    userId: updatedUser._id
  })
  const nextState = userReducer(initialStateWithUser, action)

  expect(nextState).toEqual({
    users: [mockSingleUser],
    user: null,
    loading: true,
    error: null,
    isAuthenticated: false
  })
})

// test 11: updateUserProfileAsync error
test('should handle errors when update user profile fail', () => {
  const initialStateWithUser = {
    ...initialState,
    users: [mockSingleUser]
  }

  const updatedUser = {
    ...mockSingleUser,
    firstname: 'User update',
    lastname: '3'
  }

  const error = new Error('error')
  const action = updateUserProfileAsync.rejected(error, 'error', {
    updateUser: updatedUser,
    userId: updatedUser._id
  })
  const nextState = userReducer(initialStateWithUser, action)

  expect(nextState).toEqual({
    users: [mockSingleUser],
    user: null,
    loading: false,
    error: error.message,
    isAuthenticated: false
  })
})

// test 12: updateUserPasswordAsync fulfill
test('should handle update user profile', () => {
  const initialStateWithUser = {
    ...initialState,
    users: [mockSingleUser]
  }

  const updatedUser = {
    ...mockSingleUser,
    email: 'user3@example.com',
    password: 'password3update',
    newPassword: 'password3update'
  }
  const action = updateUserPasswordAsync.fulfilled(updatedUser, 'fulfilled', {
    updatePassword: updatedUser
  })
  const nextState = userReducer(initialStateWithUser, action)
  updatedUser.password = 'password3update'

  expect(nextState).toEqual({
    users: [mockSingleUser],
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false
  })
})

// test 13: updateUserPasswordAsync pending
test('should handle loading when update user profile', () => {
  const initialStateWithUser = {
    ...initialState,
    users: [mockSingleUser]
  }

  const updatedUser = {
    ...mockSingleUser,
    password: 'password3',
    newPassword: 'passwordupdate'
  }
  const action = updateUserPasswordAsync.pending('pending', {
    updatePassword: updatedUser
  })
  const nextState = userReducer(initialStateWithUser, action)

  expect(nextState).toEqual({
    users: [mockSingleUser],
    user: null,
    loading: true,
    error: null,
    isAuthenticated: false
  })
})

// test 14: updateUserPasswordAsync error
test('should handle errors when update user profile fail', () => {
  const initialStateWithUser = {
    ...initialState,
    users: [mockSingleUser]
  }

  const updatedUser = {
    ...mockSingleUser,
    password: 'password3',
    newPassword: 'passwordupdate'
  }

  const error = new Error('error')
  const action = updateUserPasswordAsync.rejected(error, 'error', {
    updatePassword: updatedUser
  })
  const nextState = userReducer(initialStateWithUser, action)

  expect(nextState).toEqual({
    users: [mockSingleUser],
    user: null,
    loading: false,
    error: error.message,
    isAuthenticated: false
  })
})