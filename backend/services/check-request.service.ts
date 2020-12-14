import { request } from "express";

export default class CheckRequestService {

    keysAuth = ['bandIds', 'latitude', 'longitude', 'radius'];

    private queriesArray: string[];

    constructor(private queries: any) {
        this.queriesArray = Object.keys(queries);
    }

    checkKeysAndFormat() {
        const formattedQuery: {
            bandIds? : number[],
            longitude?: number
            latitude?: number
            radius?: number
        } = {};

        let error = false;
        
        // PREVENT DOS ATTACK
        if (this.queriesArray.length > 4) {
            error = true;
            return {
                error,
                formattedQuery
            }
        }

        for (let i = 0; i < this.queriesArray.length; i++) {

            if (!this.queriesArray.includes(this.queriesArray[i])) {
                error = true;
                break;
            }

            const key = this.queriesArray[i];

            if (key === 'bandIds') {
                error = this.checkNumberSeparatedByCommas(this.queries[key]);
                if (!error) {
                    const IDs: string[] = this.queries[key].toString().split(',');
                    const IDsMapped: number[] = IDs.map((id) => parseInt(id));
                    formattedQuery[key] = IDsMapped;
                }
            }

            if (key === 'latitude' || key === 'longitude') {
                error = this.checkFloat(this.queries[key]);
                if (!error) {
                    formattedQuery[key] = parseFloat(this.queries[key]);
                }
            }

            if (key === 'radius') {
                error = this.checkInt(this.queries[key]);
                if (!error) {
                    formattedQuery[key] = parseInt(this.queries[key]);
                }
            }

            if (error) {
                console.log('WARNING : MAYBE SOMEONE IS TRYING TO ATTACK PARAMS QUERY')
                break;
            }
        }

        return {
            error,
            formattedQuery
        }
    }

    typeOfRequest() {
        if (this.queriesArray.length === 1) {
            return 'bands';
        }

        if (this.queriesArray.length === 3) {
            return 'coordinates';
        } 

        return 'full';
    }

    private checkNumberSeparatedByCommas(value: string) {
        const regex = /^\d+(?:,\d+)*$/;
        return !regex.test(value);
    }

    private checkFloat(value: string) {
        const regex = /^[+-]?\d+\.\d+?$/;
        return !regex.test(value);
    }

    private checkInt(value: string) {
        const regex = /(?<=\s|^)\d+(?=\s|$)/;
        return !regex.test(value);
    }



}