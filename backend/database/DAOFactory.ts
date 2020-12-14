import BandsDAO from "./dao/bands.DAO";
import ConcertsDAO from "./dao/concerts.DAO";
import VenuesDAO from "./dao/venues.DAO";
import BandsDAOImpl from "./mongodb/bands.DAO.Impl";
import ConcertsDAOImpl from "./mongodb/concerts.DAO.Impl";
import VenuesDAOImpl from "./mongodb/venues.DAO.Impl";

export default abstract class DAOFactory {

    static getBandsDAO(): BandsDAO {
        return new BandsDAOImpl();
    }

    static getVenuesDAO(): VenuesDAO {
        return new VenuesDAOImpl();
    }

    static getConcertsDAO(): ConcertsDAO {
        return new ConcertsDAOImpl();
    }
}