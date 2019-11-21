const {
    getNewsList,
    newsCreate,
    getNewsById,
    newsUpdate,
    newsDelete
} = require('../models/news.model');

exports.getNews = async function (req, res, next) {
    try {
        const news = await getNewsList();
        res.render('admin_news', {
            results: news,
            db: 'Nyheder'
        })
    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}

exports.getNewsCreate = async function (req, res, next) {
    try {
        res.render('admin_new-news', {
            db: 'Opret en ny nyhed'
        })
    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}

exports.createNews = async function (req, res, next) {
    try {
        await newsCreate(req.fields.headline, req.fields.text)
        res.redirect('/admin/news');
    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}

exports.getNewsEdit = async function (req, res, next) {
    try {
        const news = await getNewsById(req.params.id);
        res.render('admin_edit-news', {
            news,
            db: 'Rediger nyhed'
        })
    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}

exports.editNews = async function (req, res, next) {
    try {
        const rows = await newsUpdate(req.fields.headline, req.fields.text, req.fields.date, req.params.id)

        if (rows[0].affectedRows == 1) {
            req.flash("info", "Nyheden er blevet opdateret");
        } else {
            req.flash("error", "Der skete en fejl under opdateringen");
        }

        res.redirect("/admin/news/edit/" + req.params.id);
    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}

exports.deleteNews = async function (req, res, next) {
    try {
        await newsDelete(req.params.id);
        res.redirect("/admin/news");
    } catch (error) {
        console.log(error);
        res.redirect("/admin/news");
    }
}