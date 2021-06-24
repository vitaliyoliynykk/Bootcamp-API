const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
        const bootcamps = await Bootcamp.find();
        res.status(200).json({ success: true, data: bootcamps, count: bootcamps.length });
});

// @desc    Get single bootcamps
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
        const bootcamp = await Bootcamp.findById(req.params.id);
        if (!bootcamp) {
            return next(err);
        }
        res.status(200).json({ success: true, data: bootcamp });
});

// @desc    Create new bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({ success: true, data: bootcamp });
});

// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamps
// @access  Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => { 
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
    
        if(!bootcamp) {
            return next(err);
        }

        res.status(200).json({ success: true, data: bootcamp });
});

// @desc    Delete single bootcamp
// @route   DELETE /api/v1/bootcamps
// @access  Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndRemove(req.params.id);

    if(!bootcamp) {
        return next(err)
    }

    res.status(200).json({ success: true, data: {} });
});

// @desc    Get bootcamps in radius
// @route   GET /api/v1/bootcamps/radius/:zip/:distance
// @access  Private
exports.getBootcampsRadius = asyncHandler(async (req, res, next) => {
    const { zip, distance } = req.params;

    const location = await geocoder.geocode(zip);
    const lat = location[0].latitude;
    const lng = location[0].longitude;

    const earthRadius = 6378
    const radius = distance / earthRadius;
    console.log(lat, lng, radius);
    const bootcamps = await Bootcamp.find({
        location: {
            $geoWithin: { $centerSphere: [ [ lng, lat ], radius ] }
        }
    });

    if(!bootcamps) {
        return next(err)
    }

    res.status(200).json({ success: true, data: bootcamps, count: bootcamps.length });
});
