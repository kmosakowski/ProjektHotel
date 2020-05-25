package tin.mp4.projekt.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Ordered {
    private Long idOrdered;
    private Long idReservation;
    private Long idGuest;

    public Ordered(){

    }

    public Ordered(Long idReservation, Long idGuest) {
        this.idReservation = idReservation;
        this.idGuest = idGuest;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "ID_ORDERED", nullable = false, precision = 0)
    public Long getIdOrdered() {
        return idOrdered;
    }

    public void setIdOrdered(Long idOrdered) {
        this.idOrdered = idOrdered;
    }

    @Basic
    @Column(name = "ID_RESERVATION", nullable = false, precision = 0)
    public Long getIdReservation() {
        return idReservation;
    }

    public void setIdReservation(Long idReservation) {
        this.idReservation = idReservation;
    }

    @Basic
    @Column(name = "ID_GUEST", nullable = false, precision = 0)
    public Long getIdGuest() {
        return idGuest;
    }

    public void setIdGuest(Long idGuest) {
        this.idGuest = idGuest;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Ordered ordered = (Ordered) o;
        return Objects.equals(idOrdered, ordered.idOrdered) &&
                Objects.equals(idReservation, ordered.idReservation) &&
                Objects.equals(idGuest, ordered.idGuest);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idOrdered, idReservation, idGuest);
    }

    @Override
    public String toString() {
        return "Ordered{" +
                "idOrdered=" + idOrdered +
                ", idReservation=" + idReservation +
                ", idGuest=" + idGuest +
                '}';
    }
}
