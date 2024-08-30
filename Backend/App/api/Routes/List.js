const router = require("express").Router()

const {Blogslist,Newslist,Bannerlist} = require('../Controllers/List')


router.get('/api/list/blogs',Blogslist);
router.get('/api/list/news', Newslist);
router.get('/api/list/banner', Bannerlist); 



module.exports = router;
