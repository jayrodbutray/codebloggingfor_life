const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./controllers');
const path = require('path');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const { User, Blogpost } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('logout-success', (req,res) => {
  res.sendFile(__dirname, '/public/logout-success');
});

app.get('/', async (req, res) => {
  console.log('Accessed / route');
  try {
    const blogposts = await Blogpost.findAll({
      include: User, 
    });

    res.render('homepage', { blogposts }); 
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.use(express.static('public'));
app.use(session(sess));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
