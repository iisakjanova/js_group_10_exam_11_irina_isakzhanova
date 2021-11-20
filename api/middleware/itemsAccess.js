const Item = require("../models/Item");

const itemAccess = async (req, res, next) => {
    let item;

    try {
        item = await Item.findOne({
            user: req.user._id,
            _id: req.params.id
        });
    } catch (e) {
        return res.status(500).send({message: e.message});
    }

    if (!item) {
        return res.status(403).send({error: 'Access denied!'});
    }

    next();
};

module.exports = itemAccess;