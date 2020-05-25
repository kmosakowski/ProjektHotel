package tin.mp4.projekt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tin.mp4.projekt.model.Passwords;


@Repository
public interface PasswordsRepository extends JpaRepository<Passwords, Long> {

    @Query(value = "SELECT COUNT(*) FROM PASSWORDS WHERE TO_CHAR(PASSWORD) = ?1 AND TO_CHAR(LOGIN) = ?2", nativeQuery = true)
    Integer isExist(String password, String login);

    @Query(value = "SELECT * FROM (\n" +
            "\tSELECT 'HOTEL' AS TYPE, H.ID_HOTEL AS IDUSER, H.NAME AS NAME, TO_CHAR(P.LOGIN) AS LOGIN, TO_CHAR(P.PASSWORD) AS PASSWORD FROM PASSWORDS P\n" +
            "\tINNER JOIN HOTEL H ON H.ID_PASSWORD = P.ID_PASSWORD\n" +
            "\tUNION\n" +
            "\tSELECT 'GUEST' AS TYPE, G.ID_GUEST AS IDUSER, G.NAME AS NAME, TO_CHAR(P2.LOGIN) AS LOGIN, TO_CHAR(P2.PASSWORD) AS PASSWORD FROM PASSWORDS P2\n" +
            "\tINNER JOIN GUEST G ON G.ID_PASSWORD = P2.ID_PASSWORD\n" +
            ") WHERE PASSWORD = ?1 AND LOGIN = ?2", nativeQuery = true)
    UserPassInterface getUserPass(String password, String login);

    public static interface UserPassInterface {
        String getType();
        Long getIdUser();
        String getName();
        String getLogin();
        String getPassword();
    }
}
