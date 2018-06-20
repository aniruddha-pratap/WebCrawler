import crawl from './crawl';
import { Router } from 'express';

let router = Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    crawl((visitedUrls, skippedUrls, errorUrls)=>{
        console.log("hi");
    })
    res.send("Hello");
});

router.post('/', (req, res, next) => {
    let json_response = '';

    crawl((visitedUrls, skippedUrls, errorUrls) => {
        json_response = {"success": Array.from(visitedUrls), "skipped": Array.from(skippedUrls), "error": Array.from(errorUrls)};
    }, req.body.pages);

    res.send(json_response);
});

export default router;
