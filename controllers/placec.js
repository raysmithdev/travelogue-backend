const Place = require('../models/places');
const User = require('../models/users');

exports.getUserPlaces = function(req, res) {
	User.findById(req.params.uid)
	.populate("placesRef").then((data) => {res.status(200).json(data)})
}

exports.getUserPlacesByState = function(req,res) {
	Place.find( { state: req.params.state, _creator: req.params.uid} )
	.exec().then((data) => {
		console.log(data);
		return res.status(200).json(data)})
}

exports.newPlace = function(req, res) {
	req.body._creator = req.params.uid
	Place.create(req.body)
	.then((data) => {
		User.findByIdAndUpdate(
			data._creator,
		    {$push: {"placesRef": req.body}}
    	)
    .then((data) => {
    return res.status(201).json(data)})})
}

exports.updatePlace = function (req, res) {
	Place.findOneAndUpdate(req.params.pid, req.body)
	.exec().then((data) => {res.status(200).json(data)})
}

exports.deletePlace = function (req, res) {
	Place.findByIdAndRemove(req.params.pid)
	.exec().then((data) => {res.status(204).json(data)})
}