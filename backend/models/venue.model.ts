export default class VenueModel {
    constructor(private id: number, private name: string, private latitude: number, private longitude: number) {}

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getLatitude() {
        return this.latitude;
    }

    getLongitude() {
        return this.longitude;
    }
}