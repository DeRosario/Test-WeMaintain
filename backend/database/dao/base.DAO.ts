export default interface BaseDAO < T > {
    checkDatabase(): Promise <boolean>;
    setupDb(data: any): Promise < boolean > ;
}