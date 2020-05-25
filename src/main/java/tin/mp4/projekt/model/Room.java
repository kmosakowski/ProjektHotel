package tin.mp4.projekt.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Room {
    private Long idRoom;
    private Long idHotel;
    private Long floor;
    private Long roomNumber;
    private String clazz;
    private String isSmoker;
    private String forDisabled;
    private Long price;
    private String description;

    public Room() {
    }

    public Room(Long idHotel, Long floor, Long roomNumber, String clazz, String isSmoker, String forDisabled, Long price, String description) {
        this.idHotel = idHotel;
        this.floor = floor;
        this.roomNumber = roomNumber;
        this.clazz = clazz;
        this.isSmoker = isSmoker;
        this.forDisabled = forDisabled;
        this.price = price;
        this.description = description;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "ID_ROOM", nullable = false, precision = 0)
    public Long getIdRoom() {
        return idRoom;
    }

    public void setIdRoom(Long idRoom) {
        this.idRoom = idRoom;
    }

    @Basic
    @Column(name = "ID_HOTEL", nullable = false, precision = 0)
    public Long getIdHotel() {
        return idHotel;
    }

    public void setIdHotel(Long idHotel) {
        this.idHotel = idHotel;
    }

    @Basic
    @Column(name = "FLOOR", nullable = false, precision = 0)
    public Long getFloor() {
        return floor;
    }

    public void setFloor(Long floor) {
        this.floor = floor;
    }

    @Basic
    @Column(name = "ROOM_NUMBER", nullable = false, precision = 0)
    public Long getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(Long roomNumber) {
        this.roomNumber = roomNumber;
    }

    @Basic
    @Column(name = "CLASS", nullable = false, length = 20)
    public String getClazz() {
        return clazz;
    }

    public void setClazz(String clazz) {
        this.clazz = clazz;
    }

    @Basic
    @Column(name = "IS_SMOKER", nullable = false, length = 1)
    public String getIsSmoker() {
        return isSmoker;
    }

    public void setIsSmoker(String isSmoker) {
        this.isSmoker = isSmoker;
    }

    @Basic
    @Column(name = "FOR_DISABLED", nullable = false, length = 1)
    public String getForDisabled() {
        return forDisabled;
    }

    public void setForDisabled(String forDisabled) {
        this.forDisabled = forDisabled;
    }

    @Basic
    @Column(name = "PRICE", nullable = false, precision = 2)
    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    @Basic
    @Column(name = "DESCRIPTION", nullable = true)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Room room = (Room) o;
        return Objects.equals(idRoom, room.idRoom) &&
                Objects.equals(idHotel, room.idHotel) &&
                Objects.equals(floor, room.floor) &&
                Objects.equals(roomNumber, room.roomNumber) &&
                Objects.equals(clazz, room.clazz) &&
                Objects.equals(isSmoker, room.isSmoker) &&
                Objects.equals(forDisabled, room.forDisabled) &&
                Objects.equals(price, room.price) &&
                Objects.equals(description, room.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idRoom, idHotel, floor, roomNumber, clazz, isSmoker, forDisabled, price, description);
    }

    @Override
    public String toString() {
        return "Room{" +
                "idRoom=" + idRoom +
                ", idHotel=" + idHotel +
                ", floor=" + floor +
                ", roomNumber=" + roomNumber +
                ", clazz='" + clazz + '\'' +
                ", isSmoker='" + isSmoker + '\'' +
                ", forDisabled='" + forDisabled + '\'' +
                ", price=" + price +
                ", description='" + description + '\'' +
                '}';
    }
}
