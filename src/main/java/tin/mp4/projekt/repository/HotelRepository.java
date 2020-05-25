package tin.mp4.projekt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tin.mp4.projekt.model.Hotel;
import tin.mp4.projekt.model.Room;

import java.util.List;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {

    @Query(value = "SELECT DISTINCT H.ID_HOTEL, H.NAME, TO_CHAR(H.ADDRESS) AS ADDRESS, H.CLASS_STAR, H.PARKING, H.ID_CITY, H.ID_PASSWORD \n" +
            "FROM HOTEL H\n" +
            "INNER JOIN ROOM RO ON RO.ID_HOTEL = H.ID_HOTEL\n" +
            "INNER JOIN RESERVATION RE ON RE.ID_ROOM = RO.ID_ROOM\n" +
            "INNER JOIN GUEST G ON RE.ID_GUEST = G.ID_GUEST\n" +
            "WHERE G.ID_GUEST = ?1", nativeQuery = true)
    List<Hotel> hotelByUser(Long ID_USER);

    @Query(value = "SELECT DISTINCT H.ID_HOTEL, H.NAME, TO_CHAR(H.ADDRESS) AS ADDRESS, H.CLASS_STAR, H.PARKING, H.ID_CITY, H.ID_PASSWORD FROM ROOM RO\n" +
            "INNER JOIN HOTEL H ON H.ID_HOTEL = RO.ID_HOTEL\n" +
            "INNER JOIN CITY C ON C.ID_CITY = H.ID_CITY\n" +
            "LEFT JOIN RESERVATION RE ON RE.ID_ROOM = RO.ID_ROOM\n" +
            "WHERE RE.ID_RESERVATION IS NULL", nativeQuery = true)
    List<Hotel> hotelWithoutReservation();
}
