const router = require("express").Router()
const {AddNews,getNews,updateNews,deleteNews,detailNews} = require('../Controllers/News')

router.post('/news/add', AddNews);
router.get('/news/list', getNews);
router.put('/news/update', updateNews);
router.get('/news/delete/:id', deleteNews);
router.get('/news/detail/:id', detailNews);

module.exports = router;
