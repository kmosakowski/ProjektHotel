package tin.mp4.projekt.model;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;
import java.util.Objects;

@Entity
public class Guest {
    private Long idGuest;
    private String name;
    private String surname;
    private Date birthDate;
    private String phone;
    private Long idPassword;

    public Guest(){

    }

    public Guest(String name, String surname, Date birthDate, String phone, Long idPassword) {
        this.name = name;
        this.surname = surname;
        this.birthDate = birthDate;
        this.phone = phone;
        this.idPassword = idPassword;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "ID_GUEST", nullable = false, precision = 0)
    public Long getIdGuest() {
        return idGuest;
    }

    public void setIdGuest(Long idGuest) {
        this.idGuest = idGuest;
    }

    @Basic
    @Column(name = "NAME", nullable = false, length = 30)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "SURNAME", nullable = false, length = 50)
    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    @Basic
    @Column(name = "BIRTH_DATE", nullable = false)
    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    @Basic
    @Column(name = "PHONE", nullable = true, length = 9)
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Basic
    @Column(name = "ID_PASSWORD", nullable = false, precision = 0)
    public Long getIdPassword() {
        return idPassword;
    }

    public void setIdPassword(Long idPassword) {
        this.idPassword = idPassword;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Guest guest = (Guest) o;
        return Objects.equals(idGuest, guest.idGuest) &&
                Objects.equals(name, guest.name) &&
                Objects.equals(surname, guest.surname) &&
                Objects.equals(birthDate, guest.birthDate) &&
                Objects.equals(phone, guest.phone) &&
                Objects.equals(idPassword, guest.idPassword);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idGuest, name, surname, birthDate, phone, idPassword);
    }

    @Override
    public String toString() {
        return "Guest{" +
                "idGuest=" + idGuest +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", birthDate=" + birthDate +
                ", phone='" + phone + '\'' +
                ", idPassword=" + idPassword +
                '}';
    }
}
