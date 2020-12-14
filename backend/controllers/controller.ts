import express, { Router } from 'express';

export default abstract class Controller {
    router: Router = express.Router();

    constructor(protected path: string) {}
}