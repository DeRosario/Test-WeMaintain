import { Db } from "mongodb";
import BandModel from "../../models/band.model";
import BandsDAO from "../dao/bands.DAO";
import BaseDAOImpl from "./base.DAO.Impl";

export default class BandsDAOImpl extends BaseDAOImpl < BandModel > implements BandsDAO {
  
    constructor() {
        super('bands');
    }

    async createUniqueIndex(connection: Db) {
        return await connection.collection(this.collection).createIndex({
            id: 1
        }, {
            unique: true
        });
    }

}