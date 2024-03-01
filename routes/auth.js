const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { phone_number, priority } = req.body;

    if (!phone_number) {
      return res.status(400).json({
        status: "failed",
        message: "Phone Number is required",
      });
    }

    if (!priority) {
      return res.status(400).json({
        status: "failed",
        message: "Priority is required",
      });
    }

    const phoneNumberExists = await User.findOne({
      where: { phone_number: phone_number },
    });

    if (phoneNumberExists) {
      return res.status(403).json({
        status: "Failed",
        message: "User already exists",
      });
    }

    const createUser = await User.create({
      phone_number,
      priority,
    });

    return res.status(200).json({
      status: "Success",
      message: "User created Successfully",
      user: createUser,
    });
  } catch (error) {
    console.error("Failed to add user", error);
    return res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { phone_number } = req.body;

    if (!phone_number) {
      return res.status(400).json({
        status: "Failed",
        message: "Phone number is required",
      });
    }

    const phoneNumberExists = await User.findOne({
      where: { phone_number: phone_number },
    });

    if (!phoneNumberExists) {
      return res.status(404).json({
        status: "Failed",
        message: "User does not exist",
      });
    }

    const loginToken = jwt.sign(
      phoneNumberExists.toJSON(),
      process.env.JWT_KEY,
      {
        expiresIn: 14400,
      }
    );

    return res.status(200).json({
      status: "Success",
      message: "User Logged In",
      user: phoneNumberExists,
      loginToken: loginToken,
    });
  } catch (error) {
    console.error("Login Failed", error);
    return res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
