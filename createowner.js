const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('config');
const ownermodel = require('./models/ownermode');

async function createOwner() {
    // Connect using your config and database name
    await mongoose.connect(`${config.get('MONGO_URI')}/scatch`);

    // Hash the password
    const hash = await bcrypt.hash('manas', 10); // Change 'yourpassword' to your desired password

    // Create the owner
    const owner = await ownermodel.create({
        fullname: 'manas', // Change as needed
        email: 'manas@gmail.com', // Change as needed
        password: hash,
        prodcts: [],
        picture: '',
        gstin: ''
    });

    console.log('Owner created:', owner);
    mongoose.disconnect();
}

createOwner();