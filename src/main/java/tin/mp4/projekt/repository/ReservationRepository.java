package tin.mp4.projekt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import tin.mp4.projekt.model.Reservation;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query(value = "SELECT R.* FROM RESERVATION R\n" +
            "INNER JOIN GUEST G ON G.ID_GUEST = R.ID_GUEST\n" +
            "INNER JOIN ROOM RO ON RO.ID_ROOM = R.ID_ROOM\n" +
            "WHERE R.CANCELED = 'N' AND G.ID_GUEST = ?1 AND RO.ID_ROOM = ?2", nativeQuery = true)
    List<Reservation> reservationByUserRoom(Long ID_USER, Long ID_ROOM);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM RESERVATION R \n" +
            "WHERE R.ID_RESERVATION = (\n" +
            "\tSELECT RE.ID_RESERVATION FROM RESERVATION RE\n" +
            "\tINNER JOIN ROOM RO ON RO.ID_ROOM = RE.ID_ROOM\n" +
            "\tINNER JOIN GUEST G ON RE.ID_GUEST = G.ID_GUEST\n" +
            "\tWHERE RE.ID_ROOM = ?1 AND G.ID_GUEST = ?2\n" +
            ")", nativeQuery = true)
    Integer reservationDeleteByRoom(Long ID_ROOM, Long ID_GUEST);


    @Query(value = "SELECT * FROM(\n" +
            "\tSELECT RE.ID_RESERVATION AS IDRESERVATION, RE.ID_ROOM AS IDROOM, RE.ID_GUEST AS IDGUEST, RE.FROM_DATE FROMDATE, RE.TO_DATE AS TODATE, TO_CHAR(RE.COMMENTS) AS COMMENTS, RE.CANCELED AS CANCLED, \n" +
            "\tG.ID_GUEST AS IDGUEST2, G.NAME AS NAME, G.SURNAME AS SURNAME, G.BIRTH_DATE AS BIRTHDATE, G.PHONE AS PHONE, G.ID_PASSWORD AS IDPASSWORD FROM ROOM RO\n" +
            "\tINNER JOIN HOTEL H ON RO.ID_HOTEL = H.ID_HOTEL\n" +
            "\tINNER JOIN RESERVATION RE ON RE.ID_ROOM = RO.ID_ROOM\n" +
            "\tINNER JOIN GUEST G ON G.ID_GUEST = RE.ID_GUEST\n" +
            "\tWHERE H.ID_HOTEL = ?1\n" +
            ")", nativeQuery = true)
    List<ReservationDetailsInterface> getReservationDetails(Long HOTEL_ID);

    //TODO: Zmienić typ danych na Date
    public static interface ReservationDetailsInterface {
        Long getIdReservation();
        Long getIdRoom();
        Long getIdGuest();
        String getFromDate();
        String getToDate();
        String getComments();
        String getCanceled();
        Long getIdGuest2();
        String getName();
        String getSurname();
        String getBirthDate();
        String getPhone();
        Long getIdPassword();
    }
}
