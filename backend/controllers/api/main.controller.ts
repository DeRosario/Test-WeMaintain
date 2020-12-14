import Controller from "../controller";
import express from 'express';
import DAOFactory from "../../database/DAOFactory";
import fs from 'fs';
import CheckRequestService from "../../services/check-request.service";

export default class MainController extends Controller {

    constructor() {
        super('/main');
        this.router.get(this.path, this.getData);
        this.router.get(`${this.path}/setupdb`, this.setupAllDatabase);
    }

    getData(request: express.Request, response: express.Response) {
        const checkerResult = new CheckRequestService(request.query).checkKeysAndFormat();

        if (checkerResult.error) {
            return response.send('API CALL FAILED : REFER TO API DOCUMENTATION');
        }

        const checkerTypeRequest = new CheckRequestService(request.query).typeOfRequest();

        if (checkerTypeRequest === 'bands' && checkerResult.formattedQuery.bandIds !== undefined) {
            DAOFactory.getConcertsDAO().findByBandsId(checkerResult.formattedQuery.bandIds).then((result) => {
                return response.json(result);
            }).catch((error) => {
                console.log(error);
                return response.status(500).send('An error occured in your research, contact administrator David PEREIRA - 06 52 70 99 12');
            });
        } else if (checkerTypeRequest === 'coordinates' && checkerResult.formattedQuery.latitude !== undefined &&
            checkerResult.formattedQuery.longitude !== undefined &&
            checkerResult.formattedQuery.radius !== undefined) {
            const coordinates = {
                latitude: checkerResult.formattedQuery.latitude,
                longitude: checkerResult.formattedQuery.longitude,
                radius: checkerResult.formattedQuery.radius
            };

            DAOFactory.getVenuesDAO().findByCoordinates(coordinates).then((result) => {
                response.json(result);
            }).catch((error) => {
                console.log(error);
                return response.status(500).send('An error occured in your research, contact administrator David PEREIRA - 06 52 70 99 12');
            });
        } else if (checkerTypeRequest === 'full' && checkerResult.formattedQuery.bandIds !== undefined &&
            checkerResult.formattedQuery.latitude !== undefined && checkerResult.formattedQuery.longitude !== undefined &&
            checkerResult.formattedQuery.radius !== undefined) {
            const coordinates = {
                latitude: checkerResult.formattedQuery.latitude,
                longitude: checkerResult.formattedQuery.longitude,
                radius: checkerResult.formattedQuery.radius
            };
            DAOFactory.getVenuesDAO().findByCoordinates(coordinates, checkerResult.formattedQuery.bandIds).then((result) => {
                response.json(result);
            }).catch((error) => {
                console.log(error);
                return response.status(500).send('An error occured in your research, contact administrator David PEREIRA - 06 52 70 99 12');
            });
        }
    }

    async setupAllDatabase(request: express.Request, response: express.Response) {
        const contentBands = fs.readFileSync('/build-backend/data/data_bands.json');
        const contentVenues = fs.readFileSync('/build-backend/data/data_venues.json');
        const contentConcerts = fs.readFileSync('/build-backend/data/data_concerts.json');

        if (await DAOFactory.getBandsDAO().checkDatabase() && await DAOFactory.getVenuesDAO().checkDatabase() && await DAOFactory.getConcertsDAO().checkDatabase()) {
            response.send('DATABASE WAS ALREADY SETUP :) <br \\> DON\'T TRY TO MAKE IT BUG I WANT THE JOB :)');
        } else {
            Promise.all([
                DAOFactory.getBandsDAO().setupDb(JSON.parse(contentBands.toString())),
                DAOFactory.getVenuesDAO().setupDb(JSON.parse(contentVenues.toString())),
                DAOFactory.getConcertsDAO().setupDb(JSON.parse(contentConcerts.toString()))
            ]).then((result) => {
                response.send('ALL DATABASE SETUP ENJOY :)')
            }).catch((error) => {
                console.log(error);
                response.send('ERROR IN SETTING DB, Contact David PEREIRA - 06 52 70 99 12');
            });
        }
    }
}