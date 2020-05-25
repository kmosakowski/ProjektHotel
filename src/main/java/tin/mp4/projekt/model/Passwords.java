package tin.mp4.projekt.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Passwords {
    private Long idPassword;
    private String password;
    private String login;

    public Passwords(){

    }

    public Passwords(String password, String login) {
        this.password = password;
        this.login = login;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "ID_PASSWORD", nullable = false, precision = 0)
    public Long getIdPassword() {
        return idPassword;
    }

    public void setIdPassword(Long idPassword) {
        this.idPassword = idPassword;
    }

    @Basic
    @Column(name = "PASSWORD", nullable = false)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Basic
    @Column(name = "LOGIN", nullable = false)
    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Passwords passwords = (Passwords) o;
        return Objects.equals(idPassword, passwords.idPassword) &&
                Objects.equals(password, passwords.password) &&
                Objects.equals(login, passwords.login);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idPassword, password, login);
    }

    @Override
    public String toString() {
        return "Passwords{" +
                "idPassword=" + idPassword +
                ", password='" + password + '\'' +
                ", login='" + login + '\'' +
                '}';
    }
}
