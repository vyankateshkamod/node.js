const express = require("express") ;
const {handleGetAllUsers , handleGetUserById , handleUpdateUserById, handleDeleteUserById, handleCreateNewUser} = require('../controllers/user')

const router = express.Router() ;


// get users from database
router.get('/', handleGetAllUsers) ;

// get users by id 
router.get('/:id', handleGetUserById) ;

// update users
router.patch('/:id', handleUpdateUserById) ;

// delete users
router.delete('/:id' , handleDeleteUserById)

// insert data
router.post('/', handleCreateNewUser) ;

module.exports = router ;

