require("dotenv").config();
const express = require("express");
const app = express();

require("./config/session")(app);
require("./config/flash")(app);
require("./config/views")(app);
require("./config/parser")(app);
require("./config/locals")(app);

require("./routes/frontpage.route")(app);
require("./routes/houses.route")(app);
require("./routes/login.route")(app);
require("./routes/news.route")(app);
require("./routes/contact.route")(app);

require("./routes/admin.route")(app);

require("./server/server")(app);