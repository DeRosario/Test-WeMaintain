import {
    BulkWriteResult,
    Db,
    OrderedBulkOperation
} from "mongodb";
import FinalDataModel from "../../models/final-data.model";
import BaseDAO from "../dao/base.DAO";
import ConnectionMongoDBManager from "./connection";

export default abstract class BaseDAOImpl < T > implements BaseDAO < T > {

    constructor(protected collection: string) {}

    async checkDatabase(): Promise < boolean > {
        const connection = await ConnectionMongoDBManager.connectionToMongo();

        const data = await connection.collection(this.collection).find().toArray();

        if (data.length > 0) {
            return true;
        }
        return false;
    }

    async setupDb(data: any[]): Promise < boolean > {
        const connection = await ConnectionMongoDBManager.connectionToMongo();

        await this.createUniqueIndex(connection);

        const bulk = await this.insertDatabase(data, connection);

        let success = true;

        success = await this.executeOperations(bulk).then((results: BulkWriteResult) => {
            if (results.ok) {
                return true;
            }
            return false;
        }, (error) => {
            console.log({
                error,
                db: this.collection
            });
            return false;
        });

        return success;
    }

    private async insertDatabase(data: any[], connection: Db): Promise < OrderedBulkOperation > {
        const bulk = connection.collection(this.collection).initializeOrderedBulkOp();
        for (let i = 0; i < data.length; i++) {
            bulk.insert(data[i]);
        }
        return bulk;
    }

    private async executeOperations(bulk: OrderedBulkOperation): Promise < any > {
        return bulk.execute();
    }

    abstract createUniqueIndex(connection: Db): any;

    protected parseOut(dataDB: {
        band: string,
        location: string,
        date: number,
        latitude: number,
        longitude: number
    }): FinalDataModel {
        return new FinalDataModel(dataDB.band, dataDB.location, dataDB.date, dataDB.latitude, dataDB.longitude);
    }
}