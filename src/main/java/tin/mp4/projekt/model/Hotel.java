package tin.mp4.projekt.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Hotel {
    private Long idHotel;
    private String name;
    private String address;
    private Long classStar;
    private String parking;
    private Long idCity;
    private Long idPassword;


    public Hotel() {
    }

    public Hotel(String name, String address, Long classStar, String parking, Long idCity, Long idPassword) {
        this.name = name;
        this.address = address;
        this.classStar = classStar;
        this.parking = parking;
        this.idCity = idCity;
        this.idPassword = idPassword;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "ID_HOTEL", nullable = false, precision = 0)
    public Long getIdHotel() {
        return idHotel;
    }

    public void setIdHotel(Long idHotel) {
        this.idHotel = idHotel;
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
    @Column(name = "ADDRESS", nullable = false)
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Basic
    @Column(name = "CLASS_STAR", nullable = false, precision = 0)
    public Long getClassStar() {
        return classStar;
    }

    public void setClassStar(Long classStar) {
        this.classStar = classStar;
    }

    @Basic
    @Column(name = "PARKING", nullable = false, length = 1)
    public String getParking() {
        return parking;
    }

    public void setParking(String parking) {
        this.parking = parking;
    }

    @Basic
    @Column(name = "ID_CITY", nullable = false, precision = 0)
    public Long getIdCity() {
        return idCity;
    }

    public void setIdCity(Long idCity) {
        this.idCity = idCity;
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
        Hotel hotel = (Hotel) o;
        return Objects.equals(idHotel, hotel.idHotel) &&
                Objects.equals(name, hotel.name) &&
                Objects.equals(address, hotel.address) &&
                Objects.equals(classStar, hotel.classStar) &&
                Objects.equals(parking, hotel.parking) &&
                Objects.equals(idCity, hotel.idCity) &&
                Objects.equals(idPassword, hotel.idPassword);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idHotel, name, address, classStar, parking, idCity, idPassword);
    }

    @Override
    public String toString() {
        return "Hotel{" +
                "idHotel=" + idHotel +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", classStar=" + classStar +
                ", parking='" + parking + '\'' +
                ", idCity=" + idCity +
                ", idPassword=" + idPassword +
                '}';
    }
}
