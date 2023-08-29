const router = require('express').Router();
const { Blogpost, User } = require('../models');
const withAuth = require ('../utils/auth');

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
        const blogpost = blogpostData.map((blogpost) => blogpost.get({ plain: true})
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
        });
        const blogpost = blogpostData.get({ plain: true});

        res.render('blogpost', {
            blogpost,
            loggedIn: req.session.loggedIn });
        }catch (err) {
            res.status(500).json(err);
        }
        });

        //render users profile page with withAuth login credentials
        router.get('/profile', withAuth, async (req, res) => {
            try{
                const usersData = await User.findByPk(req.session.user_id, {
                    attributes:['id', 'name'],
                    include: [{
                        model: Blogpost,
                        attributes: ['id', 'title', 'author', 'date_published'],
                    }],
                });
                const user = usersData.get ({ plain: true});
                console.log(user);
                res.render('profile', {
                    user,
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

        router.get('/logout-success', (req, res) => {


            res.render('logout');
        });


        module.exports = router;