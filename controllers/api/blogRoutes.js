const router = require('express').Router();
const { Blogpost, User, Comment  } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findByPk(req.session.user_id);
    const currentDate = Date.now();
    const newBlogpost = await Blogpost.create({
      ...req.body,
      author: user.name,
      date_published: currentDate,
      article: req.body.article,
      user_id:user.id
    });

    res.status(200).json(newBlogpost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/:id/comments', withAuth, async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findByPk(req.session.user_id);
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });    

    const newComment = await Comment.create({
      ...req.body,
      blog_id: req.params.id,
      author: user.name,
      date_published: currentDate,
    });

    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const blogpostData = await Blogpost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogpostData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogpostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
