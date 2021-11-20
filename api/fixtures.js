const mongoose = require('mongoose');
const config = require('./config');
const {nanoid} = require('nanoid');

const Category = require("./models/Category");
const User = require("./models/User");


const run = async () => {
    await mongoose.connect(config.db.url);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [computersCategory, carsCategory, otherCategory] = await Category.create({
        title: 'Computers',
    },{
        title: 'Cars',
    },{
        title: 'Other',
    });

    await User.create({
        username: 'admin',
        password: 'test',
        display_name: 'Admin',
        phone_number: '+996 123456',
        token: nanoid(),
    }, {
        username: 'somebody',
        password: '12345',
        display_name: 'Somebody',
        phone_number: '+996 777777',
        token: nanoid(),
    });

    await mongoose.connection.close();
};

run().catch(console.error);