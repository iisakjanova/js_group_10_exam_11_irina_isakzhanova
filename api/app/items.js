const express = require('express');
const path = require("path");
const {nanoid} = require("nanoid");
const multer = require("multer");

const Item = require('../models/Item');
const config = require('../config');
const auth = require("../middleware/auth");
const itemsAccess = require("../middleware/itemsAccess");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});
const router = express.Router();

router.post('/', [auth, upload.single('image')], async (req, res) => {
    const itemData = {
        title: req.body.title,
        user: req.user._id,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
    };

    if (req.file) {
        itemData.image = 'uploads/' + req.file.filename;
    }

    const item = new Item(itemData);

    try {
        await item.save();
        res.send(item);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/', async (req, res) => {
    try {
        const query = {};

        if (req.query.category) {
            query.category = req.query.category;
        }

        const items = await Item.find(query).populate("user", "username");
        res.send(items);
    } catch (e) {
        res.status(500).send({message: e.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
            .populate("user", "username display_name phone_number")
            .populate("category", "title");

        if (item) {
            res.send(item);
        } else {
            res.status(404).send({message: 'Item is not found'});
        }
    } catch (e) {
        res.status(500).send({message: e.message});
    }
});

router.delete('/:id', [auth, itemsAccess], async (req, res) => {
    try {
        const item = await Item.findByIdAndRemove(req.params.id);
        res.send(`Item '${item.title}' is removed`);
    } catch (e) {
        res.status(500).send({message: e.message});
    }
});

module.exports = router;