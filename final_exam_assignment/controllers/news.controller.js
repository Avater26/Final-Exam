const {
    getNewsDESC
} = require('../models/news.model');

exports.getNews = async function (req, res, next) {
    try {
        const news = await getNewsDESC();
        res.render('news', {
            page_name: "Nyheder",
            news: news
        })
    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}