const createError = require('http-errors');
const compression = require('compression');
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const csrf = require('csurf');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const http = require('http');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const ip = require('ip');
const logger = require('morgan');
require('dotenv').config();
const app = express(); // ==========================================> Initialize Express <====================================

app.use(helmet()); // ==============================================> Helmet middleware <=====================================
app.use(bodyParser.urlencoded({ extended: false })); // ============> CSRF Protection <=======================================
app.use(cookieParser()); // ========================================> Cookie Parser Middleware <==============================
app.use(csrf({ cookie: true })); // ================================> CSRF Use Cookies <======================================

const User = require('./models/Users'); // ==========================> Import Models & Schema <================================

const indexRouter = require('./routes/index'); // ========================> Load Routes <===========================================
const usersRouter = require('./routes/users');

require('./bin/passport')(passport); // =========================> Passport Config <=======================================
mongoose.connect(process.env.mongoURI, { useNewUrlParser: true }) // ======> Connect to our Database <===============================
.then(() => console.log('MLAB is still there | Database Connected => ♥')).catch(err => console.log(err));
function shouldCompress(req, res, next) { // =======================> Compression Middleware <=================================
  if (req.headers['x-no-compression']) { return false; } // ========> Don't compress responses w/ no-compression header <======
  return compression.filter(req, res); // ==========================> fallback to standard filter function <===================
}
app.use(compression({ filter: shouldCompress })); // ===============> Compress all responses <=================================
app.use(logger('dev')); // =========================================> Initialize the logger in Morgan <========================
app.use(bodyParser.urlencoded({ extended: false })); // ============> Body Parser middleware <=================================
app.use(bodyParser.json());
app.use(methodOverride('_method')); // =============================> Method Override Middleware <=============================

const { // =========================================================> Handlebars Helpers & Middleware <========================
  truncate, formatDateBasic, formatDate, relativeTime, formatUnderscore, formatBoolean, formatErrorArray, handyString, activePage, dropdownOpen, eSigFont, eSigFontURL, editIcon, editIconBox, deleteIconBox, curTime, openForm, closeForm, contains, formatSocial, fab, rfab, div, _div, colorSwitch, randomNum, groupManager, logo, formatCap, projectTranslator, eachIndex, eachLast, firstLetter, proximityFriendly, formatCommas, randomNumHigh, randomNumSmall,
} = require('./helpers/hbs');
app.engine('.handlebars', exphbs({
  helpers: {
    truncate: truncate, formatDateBasic: formatDateBasic, formatDate: formatDate, relativeTime: relativeTime, formatUnderscore: formatUnderscore, formatBoolean: formatBoolean, formatErrorArray: formatErrorArray, handyString: handyString, activePage: activePage, dropdownOpen: dropdownOpen, eSigFont: eSigFont, eSigFontURL: eSigFontURL, editIcon: editIcon, editIconBox: editIconBox, deleteIconBox: deleteIconBox, curTime: curTime, openForm: openForm, closeForm: closeForm, contains: contains, formatSocial: formatSocial, fab: fab, rfab: rfab, div: div, _div: _div, colorSwitch: colorSwitch, randomNum: randomNum, groupManager: groupManager, logo: logo, formatCap: formatCap, projectTranslator: projectTranslator, eachIndex: eachIndex, eachLast: eachLast, firstLetter: firstLetter, proximityFriendly: proximityFriendly, formatCommas: formatCommas, randomNumHigh: randomNumHigh, randomNumSmall: randomNumSmall,
  },
  defaultLayout: 'main',
  partialsDir: ['./views/partials/'],
  extname: '.handlebars',
}));
app.set('view engine', 'handlebars');
const sess = { // ==================================================> Create Session Object for Use <==========================
  secret: 'galaxyCat',
  name: 'ACatHasNoName',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { path: '/', httpOnly: true, secure: 'auto', maxAge: 60000 * 60 * 24 },
};
app.use(session(sess)); // =========================================> Express session middleware <=============================
app.use(passport.initialize()); // =================================> Passport middleware <====================================
app.use(passport.session());
app.use(flash()); // ===============================================> Flash Messaging / Notification middleware <==============
app.use((req, res, next) => { // ===================================> Set Global Variables <===================================
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});
app.use(express.static(path.join(__dirname, 'public'))); // ==========> Set static folders <===================================

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.redirect('../../../errorSystem/404');
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = (req.app.get('env') === 'development') ? err : {};
  if (err.code !== 'EBADCSRFTOKEN') return next(err); // ------> Handle CSRF token errors here if not CSURF forward to next middleware
  res.status(403);
  res.redirect('../../../errorSystem/403');
  // render the error page
  res.status(err.status || 500);
  res.redirect('../../../errorSystem/500');
  if (!err) return next();
});

module.exports = app;
