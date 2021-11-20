const express = require('express');
const path = require("path");
const {nanoid} = require("nanoid");
const multer = require("multer");

const Item = require('../models/Item');
const config = require('../config');
const auth = require("../middleware/auth");

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

module.exports = router;