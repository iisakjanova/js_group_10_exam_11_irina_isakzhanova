const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const userData = {
            username: req.body.username,
            password: req.body.password,
            display_name: req.body.displayName,
            phone_number: req.body.phoneNumber,
        };

        const user = new User(userData);

        user.generateToken();
        await user.save();
        res.send(user);
    } catch(error) {
        return res.status(400).send(error);
    }
});

router.post('/sessions', async (req, res) => {
    let user;

    try {
        user = await User.findOne({username: req.body.username});
    } catch (e) {
        return res.status(500).send(e);
    }

    if (!user) {
        return res.status(401).send({message: 'Credentials are wrong'});
    }

    let isMatch;

    try {
        isMatch = await user.checkPassword(req.body.password);
    } catch (e) {
        return res.status(500).send(e);
    }

    if (!isMatch) {
        return res.status(401).send({message: 'Credentials are wrong'});
    }

    try {
        user.generateToken();
        await user.save({validateBeforeSave: false});
        res.send({message: 'Login successful!', user});
    } catch (e) {
        return res.status(500).send(e);
    }
});

router.delete('/sessions', async (req, res) => {
    const token = req.get('Authorization');
    const success = {message: 'Success'};

    if (!token) return res.send(success);

    const user = await User.findOne({token});

    if (!user) return res.send(success);

    user.generateToken();

    await user.save({validateBeforeSave: false});

    return res.send(success);
});

module.exports = router;