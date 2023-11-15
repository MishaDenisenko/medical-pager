require('dotenv');
const {connect} = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');
const {raw} = require("express");

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const api_id = process.env.STREAM_API_ID;

class AuthController {
    singUp = async (req, res) => {
        try {
            const {fullName, username, password, phoneNumber} = req.body;
            const userId = crypto.randomBytes(16).toString('hex');
            const serverClient = connect(api_key, api_secret, api_id);

            const hashedPassword = await bcrypt.hash(password, 10);
            const token = serverClient.createUserToken(userId);

            res.status(200).json({token, fullName, username, userId, hashedPassword, phoneNumber});
        } catch (e) {
            res.status(500).json({message: e});
        }
    }

    login = async (req, res) => {
        try {
            const {username, password} = req.body;

            const serverClient = connect(api_key, api_secret, api_id);
            const client = StreamChat.getInstance(api_key, api_secret);

            const {users} = await client.queryUsers({name: username});

            if (!users.length) return res.status(400).json({message: 'Пользователь не найден!'});

            const success = await bcrypt.compareSync(password, users[0].hashedPassword);
            const token = serverClient.createUserToken(users[0].id);
            if (success) res.status(200).json({token, fullName: users[0].fullName, username, userId: users[0].id})
            else res.status(500).json({message: 'Неверный пароль!'});
        } catch (e) {
            res.status(500).json({message: e});
        }
    }
}
const authController = new AuthController();

const singUp = async (req, res) => {
    try {
        const {fullName, username, password, phoneNumber} = req.body;
        const userId = crypto.randomBytes(16).toString('hex');
        const serverClient = connect(api_key, api_secret, api_id);

        const hashedPassword = await bcrypt.hash(password, 10);
        const token = serverClient.createUserToken(userId);

        res.status(200).json({token, fullName, username, userId, hashedPassword, phoneNumber});
    } catch (e) {
        res.status(500).json({message: e});
    }
}

const login = async (req, res) => {
    try {
        const {username, password} = req.body;

        const serverClient = connect(api_key, api_secret, api_id);
        const client = StreamChat.getInstance(api_key, api_secret);

        const {users} = await client.queryUsers({name: username});

        if (!users.length) return res.status(400).json({message: 'Пользователь не найден!'});

        const success = await bcrypt.compareSync(password, users[0].hashedPassword);
        const token = serverClient.createUserToken(users[0].id);
        if (success) res.status(200).json({token, fullName: users[0].fullName, username, userId: users[0].id})
        else res.status(500).json({message: 'Неверный пароль!'});
    } catch (e) {
        res.status(500).json({message: e});
    }
}
module.exports = {login, singUp};