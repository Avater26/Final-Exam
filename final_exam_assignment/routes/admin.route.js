const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

const {
    getDash,
    getUsers,
    getNewUser,
    createUser,
    getUserEdit,
    editUser,
    deleteUser
} = require("../controllers/admin_users.controller");
const {
    getHouseTypes,
    getNewHouseType,
    createHouseType,
    getHouseTypeEdit,
    editHouseType,
    deleteHouseType
} = require("../controllers/admin_house_types.controller");
const {
    getHouses,
    getNewHouse,
    createNewHouse,
    getHouseEdit,
    editHouse,
    deleteHouse,
    setPrimaryImage
} = require("../controllers/admin_houses.controller");
const {
    getRoles,
    getNewRole,
    createRole,
    getRoleEdit,
    editRole,
    deleteRole
} = require("../controllers/admin_roles.controller");

const {
    getTimes,
    getTimesEdit,
    editTimes
} = require("../controllers/admin_open_times.controller");

const {
    getNews,
    getNewsCreate,
    createNews,
    getNewsEdit,
    editNews,
    deleteNews
} = require('../controllers/admin_news.controller');

const {
    getContact,
    getContactEdit,
    editContact
} = require('../controllers/admin_contact.controller')
const {
    getComments,
    deleteComment
} = require('../controllers/admin_comments.controller');
module.exports = function (app) {
    // Load admin panel
    app.get("/admin", auth, isAdmin, getDash);

    // Load admin panel dashboards
    app.get("/admin/users", auth, isAdmin, getUsers);
    app.get("/admin/houses", auth, isAdmin, getHouses);
    app.get("/admin/house_types", auth, isAdmin, getHouseTypes);
    app.get("/admin/roles", auth, isAdmin, getRoles);
    app.get("/admin/open_times", auth, isAdmin, getTimes);
    app.get("/admin/news", auth, isAdmin, getNews);
    app.get("/admin/contact", auth, isAdmin, getContact);
    app.get("/admin/comments", auth, isAdmin, getComments);

    // Load and create new user, house, category or role
    app.get("/admin/user/new", auth, isAdmin, getNewUser);
    app.post("/admin/user/new", auth, isAdmin, createUser);

    app.get("/admin/house/new", auth, isAdmin, getNewHouse);
    app.post("/admin/house/new", auth, isAdmin, createNewHouse);

    app.get("/admin/house_type/new", auth, isAdmin, getNewHouseType);
    app.post("/admin/house_type/new", auth, isAdmin, createHouseType);

    app.get("/admin/role/new", auth, isAdmin, getNewRole);
    app.post("/admin/role/new", auth, isAdmin, createRole);

    app.get("/admin/news/new", auth, isAdmin, getNewsCreate);
    app.post("/admin/news/new", auth, isAdmin, createNews);

    // Load and edit a user, house, category or role
    app.get("/admin/user/edit/:id", auth, isAdmin, getUserEdit);
    app.post("/admin/user/edit/:id", auth, isAdmin, editUser);

    app.get("/admin/house/edit/:id", auth, isAdmin, getHouseEdit);
    app.post("/admin/house/edit/:id", auth, isAdmin, editHouse);
    app.post("/admin/house/setPrimaryImage", auth, isAdmin, setPrimaryImage);

    app.get("/admin/house_type/edit/:id", auth, isAdmin, getHouseTypeEdit);
    app.post("/admin/house_type/edit/:id", auth, isAdmin, editHouseType);

    app.get("/admin/role/edit/:id", auth, isAdmin, getRoleEdit);
    app.post("/admin/role/edit/:id", auth, isAdmin, editRole);

    app.get("/admin/open_times/edit/:id", auth, isAdmin, getTimesEdit);
    app.post("/admin/open_times/edit/:id", auth, isAdmin, editTimes);

    app.get("/admin/news/edit/:id", auth, isAdmin, getNewsEdit);
    app.post("/admin/news/edit/:id", auth, isAdmin, editNews);

    app.get("/admin/contact/edit/:id", auth, isAdmin, getContactEdit);
    app.post("/admin/contact/edit/:id", auth, isAdmin, editContact);

    // Delete a user, house, category or role
    app.get("/admin/user/delete/:id", auth, isAdmin, deleteUser);
    app.get("/admin/house/delete/:id", auth, isAdmin, deleteHouse);
    app.get("/admin/house_type/delete/:id", auth, isAdmin, deleteHouseType);
    app.get("/admin/role/delete/:id", auth, isAdmin, deleteRole);
    app.get("/admin/news/delete/:id", auth, isAdmin, deleteNews);
    app.get("/admin/comment/delete/:id", auth, isAdmin, deleteComment);
}