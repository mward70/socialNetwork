//User CRUD Operations

//GET /api/users
//return all users
//pop. thots and friends

//getUserById
//GET /api/users/:userId
//return 1 user by _id
//pop. thoughts and friends
//return 404 if user not found

//createUser
//POST /api/users
//accept username and email
//validate email format
//return created user 

//updateUser
//PUT /api/users/:userId
//update user data by _id
//return updated user
//run validators 

//deleteUser
//DELETE /api/users/:userId
//delete user by _id
//BONUS: ALSO delete all their thoughts- CASCADE
//return success message

//Friend Operations

//addFriend
//POST /api/useres/:userId/friends/:friendId
//push friendId into friends array of userId
//prevent duplicates?
//return updated user

//removeFriend
//DELETE /api/users/:userId/friends/:friendId
//Pull friendId from friends array
//return updated user
