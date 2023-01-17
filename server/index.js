const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const { User } = require('./models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());

const config = require('./config/key');
var consoleLog = "MongoDB ecoview Database Connected...";

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, // useCreateIndex: true, useFindAndModify: false
})
.then(() => console.log(consoleLog))
.catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello, Express! Happy New Year! 반갑습니다.~');
});

app.get('/api/hello', (req, res) => {
    res.send("안녕하세요~!");
});

app.post('/api/users/login', (req, res) => {
    res.send("Response from Node.js /api/users/login");
});

// app.post('/api/users/register', (req, res) => {
    // res.send("Response from Node.js /api/users/register");
// });

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err});
        return res.status(200).json({
            success: true
        });
    });
});

app.post('/api/users/login', (req, res) => {
    // 요청된 Email을 Database에서 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, userInfo) => {
        if (!userInfo) {
            return res.json({
                loginSuccess: false,
                message: "제공된 Email에 해당하는 User가 없습니다."
            });
        }
    });

    // 요청된 Email이 Database에 있다면 비밀번호가 맞는지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {

    });

    // 비밀번호까지 맞다면 Token을 생성하기.

});

app.listen(port, () => {
    console.log(`boiler-plate app listening on port ${port}!`);
});
