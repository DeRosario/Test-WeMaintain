import {
    Db
} from "mongodb";
import FinalDataModel from "../../models/final-data.model";
import VenueModel from "../../models/venue.model";
import VenuesDAO from "../dao/venues.DAO";
import BaseDAOImpl from "./base.DAO.Impl";
import ConnectionMongoDBManager from "./connection";

export default class VenuesDAOImpl extends BaseDAOImpl < VenueModel > implements VenuesDAO {

    constructor() {
        super('venues');
    }

    async findByCoordinates(coordinates: {
        latitude: number,
        longitude: number,
        radius: number
    }, bandIds ? : number[]) {
        const connection = await ConnectionMongoDBManager.connectionToMongo();
        // FAKING RESULTS OF GOOGLE API ABOUT RADIUS IN THE MONGO REQUEST (/10)
        // IF WE USED GOOGLE MAP API, I WOULD COMPARE LONGITUDES AND LATITUDES OF THE VENUES
        // TO THE RESULTS FROM THE GOOGLE MAP API WITH RADIUS

        const requestMongoDb: any = [{
                $match: {
                    latitude: {
                        $gte: coordinates.latitude - (coordinates.radius / 10),
                        $lte: coordinates.latitude + (coordinates.radius / 10)
                    },
                    longitude: {
                        $gte: coordinates.longitude - (coordinates.radius / 10),
                        $lte: coordinates.longitude + (coordinates.radius / 10)
                    }
                }
            },
            {
                $graphLookup: {
                    from: 'concerts',
                    startWith: '$id',
                    connectFromField: 'id',
                    connectToField: 'bandId',
                    as: 'concert'
                }
            },
            {
                $unwind: '$concert'
            },
            {
                $graphLookup: {
                    from: 'bands',
                    startWith: '$concert.bandId',
                    connectFromField: 'concert.bandId',
                    connectToField: 'id',
                    as: 'band'
                }
            },
            {
                $unwind: '$band'
            }
        ];

        if (bandIds !== undefined) {
            requestMongoDb.push({
                $match: {
                    "band.id": {
                        $in: bandIds
                    }
                }
            });
        }

        requestMongoDb.push({
            $project: {
                band: '$band.name',
                location: '$name',
                date: '$concert.date',
                latitude: '$latitude',
                longitude: '$longitude'
            }
        })

        const data: {
            band: string,
            location: string,
            date: number,
            latitude: number,
            longitude: number
        } [] = await connection.collection(this.collection).aggregate(requestMongoDb).toArray();

        const result: FinalDataModel[] = [];

        for (let i = 0; i < data.length; i++) {
            result.push(this.parseOut(data[i]));
        }
        return result;
    }

    async createUniqueIndex(connection: Db) {
        return await connection.collection(this.collection).createIndex({
            id: 1
        }, {
            unique: true
        });
    }

}