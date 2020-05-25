package tin.mp4.projekt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tin.mp4.projekt.model.City;
import tin.mp4.projekt.model.Hotel;
import tin.mp4.projekt.model.Room;

import java.util.List;

@Repository
public interface CityRepository extends JpaRepository<City, Long> {

    @Query(value = "SELECT CITY.* FROM CITY INNER JOIN HOTEL ON HOTEL.ID_CITY = CITY.ID_CITY WHERE HOTEL.ID_HOTEL = ?1", nativeQuery = true)
    List<City> findCityByHotel(Long ID_CITY);

    @Query(value = "SELECT DISTINCT C.* FROM CITY C\n" +
            "INNER JOIN HOTEL H ON C.ID_CITY = H.ID_CITY \n" +
            "INNER JOIN ROOM RO ON RO.ID_HOTEL = H.ID_HOTEL\n" +
            "INNER JOIN RESERVATION RE ON RE.ID_ROOM = RO.ID_ROOM\n" +
            "INNER JOIN GUEST G ON RE.ID_GUEST = G.ID_GUEST\n" +
            "WHERE G.ID_GUEST = ?1", nativeQuery = true)
    List<City> cityByUser(Long ID_USER);

    @Query(value = "SELECT DISTINCT C.ID_CITY, C.CITY_NAME FROM ROOM RO\n" +
            "INNER JOIN HOTEL H ON H.ID_HOTEL = RO.ID_HOTEL\n" +
            "INNER JOIN CITY C ON C.ID_CITY = H.ID_CITY\n" +
            "LEFT JOIN RESERVATION RE ON RE.ID_ROOM = RO.ID_ROOM\n" +
            "WHERE RE.ID_RESERVATION IS NULL", nativeQuery = true)
    List<City> cityWithoutReservation();
}
