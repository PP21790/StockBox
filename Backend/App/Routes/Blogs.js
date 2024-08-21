const router = require("express").Router()
const {AddBlogs,getBlogs,updateBlogs,deleteBlogs,detailBlogs} = require('../Controllers/Blogs')

router.post('/blogs/add', AddBlogs);
router.get('/blogs/list', getBlogs);
router.put('/blogs/update', updateBlogs);
router.get('/blogs/delete/:id', deleteBlogs);
router.get('/blogs/detail/:id', detailBlogs);

module.exports = router;
