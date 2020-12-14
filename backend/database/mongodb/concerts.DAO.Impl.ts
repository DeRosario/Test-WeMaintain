import ConcertModel from "../../models/concert.model";
import FinalDataModel from "../../models/final-data.model";
import ConcertsDAO from "../dao/concerts.DAO";
import BaseDAOImpl from "./base.DAO.Impl";
import ConnectionMongoDBManager from "./connection";

export default class ConcertsDAOImpl extends BaseDAOImpl < ConcertModel > implements ConcertsDAO {

    constructor() {
        super('concerts');
    }

    async findByBandsId(IDs: number[]) {
        const connection = await ConnectionMongoDBManager.connectionToMongo();
        const data: {
            band: string,
            location: string,
            date: number,
            latitude: number,
            longitude: number
        } [] = await connection.collection(this.collection).aggregate([{
                $match: {
                    bandId: {
                        $in: IDs
                    }
                }
            },
            {
                $lookup: {
                    from: 'bands',
                    localField: 'bandId',
                    foreignField: 'id',
                    as: 'band'
                }
            },
            {
                $lookup: {
                    from: 'venues',
                    localField: 'venueId',
                    foreignField: 'id',
                    as: 'venue'
                }
            },
            {
                $unwind: '$band'
            },
            {
                $unwind: '$venue'
            },
            {
                $project: {
                    band: '$band.name',
                    location: '$venue.name',
                    date: '$date',
                    latitude: '$venue.latitude',
                    longitude: '$venue.longitude'
                }
            },
            {
                $sort: {
                    date: -1
                }
            }
        ]).toArray();

        const result: FinalDataModel[] = [];

        for (let i = 0; i < data.length; i++) {
            result.push(this.parseOut(data[i]));
        }
        return result;
    }

    createUniqueIndex() {}

}