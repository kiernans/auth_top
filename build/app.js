"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const app = (0, express_1.default)();
app.set("views", node_path_1.default.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use((0, express_session_1.default)({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport_1.default.session());
app.use(express_1.default.urlencoded({ extended: false }));
app.get("/", (req, res) => res.render("index"));
app.listen(3000, () => console.log("app listening on port 3000!"));
