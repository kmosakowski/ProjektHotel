package tin.mp4.projekt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tin.mp4.projekt.model.Room;

import java.sql.Date;
import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query(value = "SELECT R.* FROM ROOM R\n" +
            "INNER JOIN HOTEL H ON R.ID_HOTEL = H.ID_HOTEL\n" +
            "WHERE H.ID_HOTEL = ?1", nativeQuery = true)
    List<Room> findRoomsByHotel(Long ID_HOTEL);

    @Query(value = "SELECT RO.* FROM ROOM RO\n" +
            "LEFT JOIN RESERVATION RE ON RE.ID_ROOM = RO.ID_ROOM\n" +
            "WHERE RE.ID_RESERVATION IS NULL", nativeQuery = true)
    List<Room> findRoomsNotReserved();

    @Query(value = "SELECT RO.ID_ROOM AS IDROOM, RO.ID_HOTEL AS IDHOTEL, RO.FLOOR AS FLOOR, RO.ROOM_NUMBER AS ROOMNUMBER, RO.CLASS AS CLAZZ, RO.IS_SMOKER AS ISSMOKER, RO.FOR_DISABLED AS FORDISABLED, RO.PRICE AS PRICE, TO_CHAR(RO.DESCRIPTION) AS DESCRIPTION, \n" +
            "\tRE.ID_RESERVATION AS IDRESERVATION, RE.ID_ROOM AS IDROOM2, RE.ID_GUEST AS IDGUEST, TO_CHAR(RE.FROM_DATE, 'YYYY-MM-DD') AS FROMDATE, TO_CHAR(RE.TO_DATE, 'YYYY-MM-DD') AS TODATE, TO_CHAR(RE.COMMENTS) AS COMMENTS, RE.CANCELED AS CANCELED\n" +
            "FROM ROOM RO\n" +
            "INNER JOIN RESERVATION RE ON RE.ID_ROOM = RO.ID_ROOM\n" +
            "INNER JOIN GUEST G ON RE.ID_GUEST = G.ID_GUEST\n" +
            "WHERE FROM_DATE >= TRIM(SYSDATE) AND G.ID_GUEST = ?1", nativeQuery = true)
    List<RoomDetailsInterface> roomsByUser(Long ID_USER);

    @Query(value = "SELECT RO.* FROM ROOM RO\n" +
            "INNER JOIN HOTEL G ON RO.ID_HOTEL = G.ID_HOTEL\n" +
            "LEFT JOIN RESERVATION RE ON RE.ID_ROOM = RO.ID_ROOM\n" +
            "WHERE G.ID_HOTEL = ?1 AND RE.ID_RESERVATION IS NULL", nativeQuery = true)
    List<Room> findFreeRoomsByHotel(Long ID_USER);

    @Query(value = "SELECT RO.ID_ROOM AS IDROOM, RO.ID_HOTEL AS IDHOTEL, RO.FLOOR AS FLOOR, RO.ROOM_NUMBER AS ROOMNUMBER, RO.CLASS AS CLAZZ, RO.IS_SMOKER AS ISSMOKER, RO.FOR_DISABLED AS FORDISABLED, RO.PRICE AS PRICE, TO_CHAR(RO.DESCRIPTION) AS DESCRIPTION, \n" +
            "\tRE.ID_RESERVATION AS IDRESERVATION, RE.ID_ROOM AS IDROOM2, RE.ID_GUEST AS IDGUEST, TO_CHAR(RE.FROM_DATE, 'YYYY-MM-DD') AS FROMDATE, TO_CHAR(RE.TO_DATE, 'YYYY-MM-DD') AS TODATE, TO_CHAR(RE.COMMENTS) AS COMMENTS, RE.CANCELED AS CANCELED \n" +
            "FROM ROOM RO\n" +
            "INNER JOIN RESERVATION RE ON RE.ID_ROOM = RO.ID_ROOM AND FROM_DATE >= TRIM(SYSDATE)\n" +
            "INNER JOIN GUEST G ON G.ID_GUEST = RE.ID_GUEST\n" +
            "INNER JOIN HOTEL H ON H.ID_HOTEL = RO.ID_HOTEL\n" +
            "INNER JOIN CITY C ON C.ID_CITY = H.ID_CITY\n" +
            "WHERE C.ID_CITY = ?1 AND H.ID_HOTEL = ?2 AND TO_DATE(?3, 'YYYY-MM-DD') BETWEEN TRIM(RE.FROM_DATE) AND TRIM(RE.TO_DATE)\n" +
            "AND G.ID_GUEST = ?4", nativeQuery = true)
    List<RoomDetailsInterface> roomsFilter(Long ID_CITY, Long ID_HOTEL, String DATE, Long ID_GUEST);

    @Query(value = "SELECT RO.ID_ROOM AS IDROOM, RO.ID_HOTEL AS IDHOTEL, RO.FLOOR AS FLOOR, RO.ROOM_NUMBER AS ROOMNUMBER, RO.CLASS AS CLAZZ, RO.IS_SMOKER AS ISSMOKER, RO.FOR_DISABLED AS FORDISABLED, RO.PRICE AS PRICE, TO_CHAR(RO.DESCRIPTION) AS DESCRIPTION, \n" +
            "\tRE.ID_RESERVATION AS IDRESERVATION, RE.ID_ROOM AS IDROOM2, RE.ID_GUEST AS IDGUEST, TO_CHAR(RE.FROM_DATE, 'YYYY-MM-DD') AS FROMDATE, TO_CHAR(RE.TO_DATE, 'YYYY-MM-DD') AS TODATE, TO_CHAR(RE.COMMENTS) AS COMMENTS, RE.CANCELED AS CANCELED \n" +
            "FROM ROOM RO\n" +
            "INNER JOIN HOTEL H ON H.ID_HOTEL = RO.ID_HOTEL\n" +
            "INNER JOIN CITY C ON C.ID_CITY = H.ID_CITY\n" +
            "INNER JOIN RESERVATION RE ON RO.ID_ROOM = RE.ID_ROOM\n" +
            "INNER JOIN GUEST G ON G.ID_GUEST = RE.ID_GUEST\n" +
            "WHERE FROM_DATE >= TRIM(SYSDATE) AND C.ID_CITY = ?1 AND H.ID_HOTEL = ?2 AND G.ID_GUEST = ?3", nativeQuery = true)
    List<RoomDetailsInterface> roomsFilterWithoutDateDetails(Long ID_CITY, Long ID_HOTEL, Long ID_GUEST);

    @Query(value = "SELECT RO.* FROM ROOM RO\n" +
            "INNER JOIN HOTEL H ON H.ID_HOTEL = RO.ID_HOTEL\n" +
            "INNER JOIN CITY C ON C.ID_CITY = H.ID_CITY\n" +
            "WHERE C.ID_CITY = ?1 AND H.ID_HOTEL = ?2", nativeQuery = true)
    List<Room> roomsFilterWithoutDate(Long ID_CITY, Long ID_HOTEL);

    @Query(value = "SELECT R.* FROM ROOM R\n" +
            "INNER JOIN HOTEL H ON R.ID_HOTEL = H.ID_HOTEL\n" +
            "INNER JOIN CITY C ON C.ID_CITY = H.ID_HOTEL\n" +
            "WHERE C.ID_CITY = ?1 AND H.ID_HOTEL = ?2", nativeQuery = true)
    List<Room> roomsByHotelCity(Long ID_CITY, Long ID_HOTEL);

    public static interface RoomDetailsInterface {
        //Room
        Long getIdRoom();
        Long getIdHotel();
        Long getfloor();
        Long getRoomNumber();
        String getClazz();
        String getIsSmoker();
        String getForDisabled();
        Long getPrice();
        String getDescription();
        //Reservation
        Long getIdReservation();
        Long getIdRoom2();
        Long getIdGuest();
        Date getFromDate();
        Date getToDate();
        String getComments();
        String getCanceled();
    }
}
