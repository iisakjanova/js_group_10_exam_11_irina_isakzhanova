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

    const [admin, somebody, goodPerson] = await User.create({
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
    },{
        username: 'goodperson',
        password: 'hello',
        display_name: 'Good Person',
        phone_number: '+996 555555',
        token: nanoid(),
    });

    await Item.create({
        user: admin,
        category: computersCategory,
        title: 'ASUS X515EA-BQ861R 15.6" Core i5 Notebook Win 10 Pro',
        description: 'CPU: Intel Core i5-1135G7 || 4 Cores 2.4GHz (8M Cache, up to 4.2GHz). ' +
            'Screen Size: 15.6" FHD (1920 x 1080) IPS-Level 60Hz. ' +
            'GPU: Intel Iris Xe Graphics. ' +
            'RAM Size: 8GB DDR4 RAM (4GB Onboard + 1x 4GB DDR4 SO-DIMM, [Max 12GB]). ' +
            'SSD: 512GB M.2 PCIe 3.0 SSD. ' +
            'Ethernet Port: No LAN Port. ' +
            'Wireless Connectivity: Wi-Fi 5 (802.11ac) + Bluetooth 4.2. ' +
            'Display Outputs: 1 x HDMI 1.4. ' +
            'Thunderbolt: No Thunderbolt. ' +
            'USB: 1 x USB 3.2 Gen 1 Type-A || 1x USB 3.2 Gen 1 Type-C || 2x USB 2.0 Type-A. ' +
            'Audio Outputs: 1 x 3.5mm Combo Audio Jack. ' +
            'Other: No Optical Drive || No Backlit Keyboard. ' +
            'Operating System: Windows 10 Pro. ',
        image: 'fixtures/computer1.jpeg',
        price: 1200,
    }, {
        user: admin,
        category: computersCategory,
        title: 'ASUS S712EA-AU023T 17.3" Core i5 Notebook Win 10 Home',
        description: 'CPU: Intel Core i5-1135G7 || 4 Cores 2.4GHz (8MB Cache, up to 4.2GHz). ' +
            'Screen Size: 17.3" FHD (1920 x 1080) IPS-Level 60Hz. ' +
            'GPU: Intel Iris Xe Graphics. ' +
            'RAM Size: 8GB DDR4 RAM. ' +
            'SSD: 512GB M.2 NVMe. ' +
            'HDD: 1TB. ' +
            'Ethernet Port: No LAN Port. ' +
            'Wireless Connectivity: Wi-Fi 6 (802.11ax) + Bluetooth 5. ' +
            'Display Outputs: 1 x HDMI. ' +
            'USB: 1 x USB 3 || 1 x USB 3 Type-C || 2 x USB 2.0 Type-A. ' +
            'Audio Outputs: 1 x 3.5mm Combo Audio Jack. ' +
            'Other: Micro SD Card Reader || No Optical Drive. ' +
            'Operating System: Windows 10 Home. ',
        image: 'fixtures/computer2.jpeg',
        price: 1300,
    },{
        user: somebody,
        category: computersCategory,
        title: 'ASUS TP412FA-EC405RA 14" Touch Core i5 Flip Notebook Win 10 Pro Academic',
        description: 'CPU: Intel Core i5-10210U Processor || 4 Cores 1.6 GHz (6MB Cache, up to 4.2 GHz). ' +
            'Screen Size: 14" FHD (1920 x 1080) || IPS-level Touch Screen || Glossy Coating. ' +
            'Onboard GPU: Intel UHD Graphics for 10th Gen Intel Processors. ' +
            'RAM Size: 8GB DDR4 Onboard (1 available SO-DIMM socket). ' +
            'SSD: 512GB NVMe. ' +
            'Ethernet Port: No Ethernet Port. ' +
            'Wireless Connectivity: Wi-Fi 5 (802.11ac) + Bluetooth 4.2. ' +
            'Display Outputs: 1 x HDMI 1.4. ' +
            'USB: 1 x USB 3.2 Gen 1 Type-A || 1 x USB 3.2 Gen 1 Type-C || 2 x USB 2.0 Type-A. ' +
            'Audio Outputs: 1 x 3.5mm Combo Jack. ' +
            'Other: No Optical Drive || SD Card Reader || Includes Stylus. ' +
            'Operating System: Windows 10 Pro Academic. ',
        image: 'fixtures/computer3.jpeg',
        price: 1300,
    },{
        user: somebody,
        category: carsCategory,
        title: 'BMW 2 Series Coupé',
        description: 'Uncompromising, self-confident, and expressive: As the successors ' +
            'to the BMW 1 Series Coupé, the BMW 2 Series Coupé, Convertible and Gran Coupé ' +
            'are the continuation of its concept. The BMW 2 Series stands for powerful, ' +
            'compact vehicles – the best in their class. Naturally, this also applies to the ' +
            'BMW 2 Series Active Tourer and BMW 2 Series Gran Tourer, which combine sportiness ' +
            'and efficiency with flexibility and versatility to bring an extra dose of ' +
            'excitement and comfort to everyday life.',
        image: 'fixtures/car1.png',
        price: 30000,
    },{
        user: goodPerson,
        category: carsCategory,
        title: 'Kia Forte',
        description: 'It has a roomy cabin with high-quality materials, adult-friendly seating, ' +
            'and an easy-to-use infotainment system. This Kia also comes with a generous number ' +
            'of standard features, especially considering its low price point. Fuel economy is ' +
            'good in the base model, and a performance-enhanced Forte GT model is available.',
        image: 'fixtures/car2.png',
        price: 21000,
    },{
        user: admin,
        category: otherCategory,
        title: 'Apple AirPods Max Blue',
        description: 'Compatible with iPhone, iPad and iPod touch models with iOS 12.2 or later,' +
            ' Apple Watch models with watch OS 5.2 or later, Mac models with macOS 10.14.4 or late',
        image: 'fixtures/airpods.jpeg',
        price: 470,
    },{
        user: goodPerson,
        category: otherCategory,
        title: 'Huawei Nova 8i Dual SIM 128GB 6GB RAM Black',
        description: 'Dual SIM (Nano-SIM, dual stand-by). Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi ' +
            'Direct, hotspot. Fingerprint (side-mounted), accelerometer, gyro, proximity, compass.' +
            ' Fast charging 66W, 60% in 17 min, 100% in 38 min (advertised).',
        image: 'fixtures/mobile.jpeg',
        price: 350,
    });

    await mongoose.connection.close();
};

run().catch(console.error);