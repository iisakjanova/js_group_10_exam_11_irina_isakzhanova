const mongoose = require('mongoose');
const config = require('./config');
const {nanoid} = require('nanoid');

const Category = require("./models/Category");
const User = require("./models/User");
const Item = require("./models/Item");


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

    const [admin, somebody] = await User.create({
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

    await Item.create({
        user: admin,
        category: computersCategory,
        title: 'ASUS X515EA-BQ861R 15.6" Core i5 Notebook Win 10 Pro',
        description: 'CPU: Intel Core i5-1135G7 || 4 Cores 2.4GHz (8M Cache, up to 4.2GHz)\n' +
            'Screen Size: 15.6" FHD (1920 x 1080) IPS-Level 60Hz\n' +
            'GPU: Intel Iris Xe Graphics\n' +
            'RAM Size: 8GB DDR4 RAM (4GB Onboard + 1x 4GB DDR4 SO-DIMM, [Max 12GB])\n' +
            'SSD: 512GB M.2 PCIe 3.0 SSD\n' +
            'Ethernet Port: No LAN Port\n' +
            'Wireless Connectivity: Wi-Fi 5 (802.11ac) + Bluetooth 4.2\n' +
            'Display Outputs: 1 x HDMI 1.4\n' +
            'Thunderbolt: No Thunderbolt\n' +
            'USB: 1 x USB 3.2 Gen 1 Type-A || 1x USB 3.2 Gen 1 Type-C || 2x USB 2.0 Type-A\n' +
            'Audio Outputs: 1 x 3.5mm Combo Audio Jack\n' +
            'Other: No Optical Drive || No Backlit Keyboard\n' +
            'Operating System: Windows 10 Pro\n',
        image: 'fixtures/computer1.jpg',
        price: 1200,
    }, {
        user: admin,
        category: computersCategory,
        title: 'ASUS S712EA-AU023T 17.3" Core i5 Notebook Win 10 Home',
        description: 'CPU: Intel Core i5-1135G7 || 4 Cores 2.4GHz (8MB Cache, up to 4.2GHz)\n' +
            'Screen Size: 17.3" FHD (1920 x 1080) IPS-Level 60Hz\n' +
            'GPU: Intel Iris Xe Graphics\n' +
            'RAM Size: 8GB DDR4 RAM\n' +
            'SSD: 512GB M.2 NVMe\n' +
            'HDD: 1TB\n' +
            'Ethernet Port: No LAN Port\n' +
            'Wireless Connectivity: Wi-Fi 6 (802.11ax) + Bluetooth 5\n' +
            'Display Outputs: 1 x HDMI\n' +
            'USB: 1 x USB 3 || 1 x USB 3 Type-C || 2 x USB 2.0 Type-A\n' +
            'Audio Outputs: 1 x 3.5mm Combo Audio Jack\n' +
            'Other: Micro SD Card Reader || No Optical Drive\n' +
            'Operating System: Windows 10 Home\n',
        image: 'fixtures/computer2.jpg',
        price: 1300,
    },{
        user: somebody,
        category: computersCategory,
        title: 'ASUS TP412FA-EC405RA 14" Touch Core i5 Flip Notebook Win 10 Pro Academic',
        description: 'CPU: Intel Core i5-10210U Processor || 4 Cores 1.6 GHz (6MB Cache, up to 4.2 GHz)\n' +
            'Screen Size: 14" FHD (1920 x 1080) || IPS-level Touch Screen || Glossy Coating\n' +
            'Onboard GPU: Intel UHD Graphics for 10th Gen Intel Processors\n' +
            'RAM Size: 8GB DDR4 Onboard (1 available SO-DIMM socket)\n' +
            'SSD: 512GB NVMe\n' +
            'Ethernet Port: No Ethernet Port\n' +
            'Wireless Connectivity: Wi-Fi 5 (802.11ac) + Bluetooth 4.2\n' +
            'Display Outputs: 1 x HDMI 1.4\n' +
            'USB: 1 x USB 3.2 Gen 1 Type-A || 1 x USB 3.2 Gen 1 Type-C || 2 x USB 2.0 Type-A\n' +
            'Audio Outputs: 1 x 3.5mm Combo Jack\n' +
            'Other: No Optical Drive || SD Card Reader || Includes Stylus\n' +
            'Operating System: Windows 10 Pro Academic\n',
        image: 'fixtures/computer3.jpg',
        price: 1300,
    });

    await mongoose.connection.close();
};

run().catch(console.error);