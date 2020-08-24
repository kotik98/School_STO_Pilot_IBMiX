var express = require("express");
var router = express.Router();

const Comander = require("../models/comander")
const Pilot = require("../models/pilot")

router.post("/api/getAllFly", async (req, res) => {

    try {

        // здесь будет обращение к базе 

        return res.status(200).json({ response: arr1 });
    } catch (e) {
        res.status(400).json({ response: "fail" });
    }
});


module.exports = router;

