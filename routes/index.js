var express = require('express');
var router = express.Router();
var sm = require('sitemap');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Express' });
});

// Sitemap construct



router.get('/sitemap.xml', function(req, res) {
    var sitemap = sm.createSitemap ({
        hostname: 'https://www.inndico.com/',
        cacheTime: 600000,        // 600 sec - cache purge period
        urls: [
            { url: '/',  changefreq: 'daily', priority: 1 },
            { url: '/contact/',  changefreq: 'weekly',  priority: 0.7 }
        ]
    });
    sitemap.toXML( function (err, xml) {
        if (err) {
            return res.status(500).end();
        }
        res.header('Content-Type', 'application/xml');
        res.send( xml );
    });
});
// End of Sitemap constructor


module.exports = router;
