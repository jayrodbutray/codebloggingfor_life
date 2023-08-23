const router = require('express').Router();
const { Blogpost, User } = require('../models');
const withAuth = require ('../utils/auth');
const { post } = require('./api');

//get all blogs

router.get('/', async (req, res) => {
    try {
        const blogpostData = await Blogpost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
        const blogpost = blogpostData.map((post) => blogpost.get({ plain: true})
        );

        res.render('homepage', {
            blogpost,
            logged_in: req.session.logged_in
        });
    }catch (err){
        res.status(500).json(err);
    }
});

//get one blogpost

router.get('/blogpost/:id', async (req, res) => {
    try {
        const blogpostData = await Blogpost.findByPk(req.params.id, {
            include: [
                {
                    model: Blogpost,
                    attributes: [
                        'id',
                        'title',
                        'author',
                        'date_published',
                        'article',
                    ],
                },
            ],
        });
        const blogpost = blogpostData.get({ plain: true});

        res.render('blogpost', {
            ...blogpost,
            loggedIn: req.session.loggedIn });
        }catch (err) {
            res.status(500).json(err);
        }
        });

        //render users profile page with withAuth login credentials
        router.get('/profile', withAuth, async (req, res) => {
            try{
                const usersData = await User.findByPk(req.session.user_id, {
                    attributes: {exclude: ['password']},
                    include: [{model: Blogpost}],
                });
                const user = usersData.get ({ plain: true});

                res.render('profile', {
                    ...user,
                    logged_in: true
                });
            } catch(err) {
                res.status(500).json(err);
            }
        });

        router.get('/login', (req, res) => {
            //if logged in then...
            if (req.session.logged_in) {
                res.redirect('/profile');
                return;
            }

            res.render('login');
        });

        module.exports = router;