export default class FinalDataModel {
    constructor(private band: string, private location: string, private date: number, private latitude: number, private longitude: number) {}

    getBand() {
        return this.band;
    }

    getLocation() {
        return this.location;
    }

    getDate() {
        return this.date;
    }

    getLatitude() {
        return this.latitude;
    }

    getLongitude() {
        return this.longitude;
    }
}