const router = require("express").Router()

const {Blogslist,Newslist,Bannerlist,Plancategorysist,getPlansByPlancategoryId,addPlanSubscription,myPlan,Couponlist,Signallist,applyCoupon,showSignalsToClients,Servicelist,Faqlist,detailContent,showSignalsToClientsClose,BasketList,pastPerformance} = require('../Controllers/List')


router.get('/api/list/blogs',Blogslist);
router.get('/api/list/news', Newslist);
router.get('/api/list/banner', Bannerlist); 
router.get('/api/list/plancategory', Plancategorysist); 
router.get('/api/list/planbycategory', getPlansByPlancategoryId); 
router.post('/api/list/addplansubscription', addPlanSubscription); 
router.get('/api/list/myplan/:id', myPlan); 
router.get('/api/list/coupon', Couponlist);
router.get('/api/list/signal', Signallist);
router.post('/api/list/applycoupon', applyCoupon);
router.post('/api/list/signalclient', showSignalsToClients);
router.post('/api/list/signalclientclose', showSignalsToClientsClose);

router.get('/api/list/service', Servicelist);
router.get('/api/list/faq', Faqlist);
router.get('/api/list/content/:id', detailContent);
router.get('/api/list/basket', BasketList);
router.get('/api/list/past-performance/:id', pastPerformance);




module.exports = router;
