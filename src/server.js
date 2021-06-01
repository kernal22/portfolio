const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const engine = require('ejs-locals');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const sessionStore = new session.MemoryStore;

const webRouter = require('./routes/web.route');
const adminRouter = require('./routes/admin.route');
const authRouter = require('./routes/auth.route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "3mb" }));
app.use(helmet());
app.use(cors());

app.use(express.static(path.join(__dirname, '/../public')));
app.set('views', path.join(__dirname, 'views'));

app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'happy dog',
    store: sessionStore,
    saveUninitialized: true,
    resave: true
}));

app.use(flash());

app.use('/', webRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

mongoose.connect('mongodb://mongo:27017/sanjay', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}, (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log('connected')
    }
});

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 500;
    next(error);
});
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({ error: { status: err.status || 500, message: err.message || 'Internal Server Error' } })
});

module.exports = app;