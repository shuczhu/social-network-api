const { User, Thought } = require('../models');

module.exports = {
    //Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    //Get single thought by ID
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
        .select('-__v')
        .populate('reactions')
        .then((thought)=> 
        !thought
        ? res.status(404).json({ message: "No thought with this ID exists"})
        : res.json(thought))
        .catch((err)=> res.status(500).json(err));
    },

    //Create a new thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought)=> {
            return User.findOneAndUpdate(
                { _id: req.body.userId},
                { $addToSet: {thoughts: thought._id}},
                {new: true}
            );
        })
        .then((user)=> 
        !user
        ? res.status(404).json({ message: "Ooops didn't work"})
        : res.json({message: "Yay it worked!"}))
        .catch((err)=> res.status(500).json(err));
    },

    //Update thought by ID
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $set: req.body},
            {runValidators: true, new: true}
        )
        .then((thought)=> 
        !thought
        ? res.status(404).json({message: 'No thought with this ID exists'})
        : res.json(thought))
        .catch((err)=> res.status(500).json(err));
    },

    //remove thought by ID
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId})
        .then((thought)=> 
        !thought
        ? res.status(404).json({ message: "No thought with that ID exists"})
        : User.findOneAndUpdate(
            { thoughts: req.params.thoughtId},
            { $pull: { thoughts: req.params.thoughtId}},
            { new: true}
        ))
        .then((user)=>
        !user
        ? res
        .status(404).json({ message: "thought created by no user with this id!"})
        : res.json({message: "Thought successfully deleted!"})
        )
        .catch((err)=> res.status(500).json(err));
    },

    //add a reaction

    addReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
        )
        .then((thought)=>
        !thought
        ? res.status(404).json({message: "No thought with this id!"})
        : res.json(thought))
        .catch((err)=> res.status(500).json(err));

    },

    //remove a reaction
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $pull: {reactions: {reactionId: req.body.reactionId}}},
            { runValidators: true, new: true}
        )
        .then((thought)=> 
        !thought
        ? res.status(404).json({message: "No thought with this id!"})
        : res.json(thought))
        .catch((err)=> res.status(500).json(err));
    },

};