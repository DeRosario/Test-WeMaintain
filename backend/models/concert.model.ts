export default class ConcertModel {
    constructor(private venueId: number, private bandId: number, private date: number) {}

    getVenueId() {
        return this.venueId;
    }

    getBandId() {
        return this.bandId;
    }

    getDate() {
        return this.date;
    }
}