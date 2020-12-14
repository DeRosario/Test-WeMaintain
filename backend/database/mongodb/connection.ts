import {
    MongoClient,
    Db
} from 'mongodb';

export default abstract class ConnectionMongoDBManager {

    private static DB_HOST = `db-container`;
    private static DB_PORT = '27017';
    private static DB_NAME = 'test-WeMaintain';

    static async connectionToMongo(): Promise < Db > {
        const mongoURI = `mongodb://${this.DB_HOST}:${this.DB_PORT}/${this.DB_NAME}`;
        try {
            const mongo = await MongoClient.connect(mongoURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });

            return mongo.db(this.DB_NAME);
        } catch (error) {
            throw new Error('[ConnectionMongoDBManager] - Echec de la connexion à la base de données.');
        };
    }
}