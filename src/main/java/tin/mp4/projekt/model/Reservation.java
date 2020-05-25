package tin.mp4.projekt.model;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;

@Entity
public class Reservation {
    private Long idReservation;
    private Long idRoom;
    private Long idGuest;
    private Date fromDate;
    private Date toDate;
    private String comments;
    private String canceled;

    public Reservation() {
    }

    public Reservation(Long idRoom, Long idGuest, Date fromDate, Date toDate, String comments, String canceled) {
        this.idRoom = idRoom;
        this.idGuest = idGuest;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.comments = comments;
        this.canceled = canceled;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "ID_RESERVATION", nullable = false, precision = 0)
    public Long getIdReservation() {
        return idReservation;
    }

    public void setIdReservation(Long idReservation) {
        this.idReservation = idReservation;
    }

    @Basic
    @Column(name = "ID_ROOM", nullable = false, precision = 0)
    public Long getIdRoom() {
        return idRoom;
    }

    public void setIdRoom(Long idRoom) {
        this.idRoom = idRoom;
    }

    @Basic
    @Column(name = "ID_GUEST", nullable = false, precision = 0)
    public Long getIdGuest() {
        return idGuest;
    }

    public void setIdGuest(Long idGuest) {
        this.idGuest = idGuest;
    }

    @Basic
    @Column(name = "FROM_DATE", nullable = false)
    public Date getFromDate() {
        return fromDate;
    }

    public void setFromDate(Date fromDate) {
        this.fromDate = fromDate;
    }

    @Basic
    @Column(name = "TO_DATE", nullable = true)
    public Date getToDate() {
        return toDate;
    }

    public void setToDate(Date toDate) {
        this.toDate = toDate;
    }

    @Basic
    @Column(name = "COMMENTS", nullable = true)
    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    @Basic
    @Column(name = "CANCELED", nullable = false, length = 1)
    public String getCanceled() {
        return canceled;
    }

    public void setCanceled(String canceled) {
        this.canceled = canceled;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Reservation that = (Reservation) o;
        return Objects.equals(idReservation, that.idReservation) &&
                Objects.equals(idRoom, that.idRoom) &&
                Objects.equals(idGuest, that.idGuest) &&
                Objects.equals(fromDate, that.fromDate) &&
                Objects.equals(toDate, that.toDate) &&
                Objects.equals(comments, that.comments) &&
                Objects.equals(canceled, that.canceled);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idReservation, idRoom, idGuest, fromDate, toDate, comments, canceled);
    }
}
