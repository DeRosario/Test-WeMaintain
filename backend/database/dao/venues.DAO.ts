import FinalDataModel from "../../models/final-data.model";
import VenueModel from "../../models/venue.model";
import BaseDAO from "./base.DAO";

export default interface VenuesDAO extends BaseDAO < VenueModel > {
    // ALL OTHERS SPECIFICS METHODS FOR VENUES
    findByCoordinates(coordinates: {
        latitude: number,
        longitude: number,
        radius: number
    }, bandIds? : number[]): Promise < FinalDataModel[] > ;
}