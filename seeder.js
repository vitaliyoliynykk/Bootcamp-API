const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config/cnfg.env' });

const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'));

const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        await Course.create(courses);
        console.log('Darta Imported');
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        await Course.deleteMany();
        console.log('Darta Destroyed');
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}
