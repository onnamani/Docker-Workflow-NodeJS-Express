const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
    const { username, password } = req.body;

    try {
        const userExists = await User.findOne({ username }) ? true : false;

        if(userExists) {
            res.status(409).json({
                status: "username already taken"
            })

            return;
        }

        const hashPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({
            username,
            password: hashPassword
        });

        req.session.user = newUser;

        res.status(201).json({
            status: "success",
            data: {
                user: newUser
            }
        })
    } catch(e) {
        res.status(400).json({
            status: "failed to create account"
        })
    }
}

exports.login = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await User.findOne({ username });

        if(!user) {
            res.status(404).json({
                status: "fail",
                message: "user not found"
            })

            return;
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(isPasswordCorrect) {
            req.session.user = user;
            res.status(200).json({
                status: "success"
            })
        } else {
            res.status(400).json({
                status: "fail",
                message: "incorrect username or password"
            })
        }
    } catch(e) {
        res.status(400).json({
            status: "fail"
        })
    }
}