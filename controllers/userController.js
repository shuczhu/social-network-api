const { User, Thought } = require('../models');

module.exports = {
    //Get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    //Get single user by ID
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId})
        .select('-__v')
        .populate('thoughts')
        .populate('friends')
        .then((user)=> 
        !user
        ? res.status(404).json({ message: "No user with this ID exists"})
        : res.json(user))
        .catch((err)=> res.status(500).json(err));
    },

    //Create a new user
    createUser(req, res) {
        User.create(req.body)
        .then((dbUserData)=> res.json(dbUserData))
        .catch((err)=> res.status(500).json(err));
    },

    //Update user by ID
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $set: req.body},
            {runValidators: true, new: true}
        )
        .then((user)=> 
        !user
        ? res.status(404).json({message: 'No User with this ID exists'})
        : res.json(user))
        .catch((err)=> res.status(500).json(err));
    },

    //remove user by ID
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId})
        .then((user)=> 
        !user
        ? res.status(404).json({ message: "No user with that ID exists"})
        : Thought.deleteMany({ _id: {$in: User.thoughts}}))
        .then(()=> res.json({message: 'User and associated data deleted'}))
        .catch((err)=> res.status(500).json(err));
    },

    //add a friend for user
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $addToSet: {friends: req.params.friendId}},
            {runValidators: true, new: true}
        )
        .then((user)=> 
        !user
        ? res.status(404).json({message: 'No User with this ID exists'})
        : res.json(user))
        .catch((err)=> res.status(500).json(err));
    },

    //delete a friend for user
    deleteFriend(req, res){
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $pull: {friends: req.params.friendId}},
            {runValidators: true, new: true}
        )
        .then((user)=> 
        !user
        ? res.status(404).json({message: 'No User with this ID exists'})
        : res.json(user))
        .catch((err)=> res.status(500).json(err));
    }
};