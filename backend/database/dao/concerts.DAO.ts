import ConcertModel from "../../models/concert.model";
import FinalDataModel from "../../models/final-data.model";
import BaseDAO from "./base.DAO";

export default interface ConcertsDAO extends BaseDAO < ConcertModel > {
    // ALL OTHERS SPECIFICS METHODS FOR CONCERTS
    findByBandsId(IDs: number[]): Promise <FinalDataModel[]>;
}