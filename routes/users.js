var express = require("express");
var router = express.Router();
const sessionChecker = require("../middleware/auth");

const Comander = require("../models/comander")
const Pilot = require("../models/pilot")


router.get("/api/profilePilot", sessionChecker, async (req, res, next) => {
  try {
    const { email } = req.session.user;
    const userMainInfo = await Pilot.findOne({ email });

    const {
      first_name,
      last_name,
      role,
    } = userMainInfo;


    const user = {
      first_name,
      last_name,
      role,
      email
    };
    console.log('Да, вот он юзер', user)
    res.status(201).json({ response: user });
  } catch (e) {
    res.status(400).json({ response: "fail" });
  }
});


router.post("/api/pilot/edit", sessionChecker, async (req, res, next) => {
  try {
    const { email } = req.session.user;

    const {
      first_name,
      last_name,
      role,
    } = req.body.editUser;



    await Pilot.updateOne(
      { email },
      {
        $set: {
          first_name,
          last_name,
          role,
        }
      }
    );

    res.status(200).json({ response: 'success' });
  } catch (e) {
    res.status(400).json({ response: "fail" });
  }
});



router.post("/api/comander/edit", sessionChecker, async (req, res, next) => {
  try {
    const { email } = req.session.user;
    console.log('Заходит')
    const {
      first_name,
      last_name,
      role,

    } = req.body.editUser;



    await Comander.updateOne(
      { email },
      {
        $set: {
          first_name,
          last_name,
          role,
        }
      }
    );

    res.status(200).json({ response: 'success' });
  } catch (e) {
    res.status(400).json({ response: "fail" });
  }
});



module.exports = router;
