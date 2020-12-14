import App from "./app";
import MainController from "./controllers/api/main.controller";

new App(8888, [
    new MainController()
]).listen();