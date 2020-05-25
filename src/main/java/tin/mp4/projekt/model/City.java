package tin.mp4.projekt.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class City {
    private Long idCity;
    private String cityName;

    public City(){

    }

    public City(String cityName) {
        this.cityName = cityName;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "ID_CITY", unique = true, nullable = false, precision = 0)
    public Long getIdCity() {
        return idCity;
    }

    public void setIdCity(Long idCity) {
        this.idCity = idCity;
    }

    @Basic
    @Column(name = "CITY_NAME", nullable = false, length = 50)
    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        City city = (City) o;
        return Objects.equals(idCity, city.idCity) &&
                Objects.equals(cityName, city.cityName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idCity, cityName);
    }

    @Override
    public String toString() {
        return "City{" +
                "idCity=" + idCity +
                ", cityName='" + cityName + '\'' +
                '}';
    }
}
