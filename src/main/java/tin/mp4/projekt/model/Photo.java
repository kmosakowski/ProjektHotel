package tin.mp4.projekt.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Photo {
    private Long idPhoto;
    private Long idRoom;
    private String path;
    private String name;

    public Photo(){

    }

    public Photo(Long idRoom, String path, String name) {
        this.idRoom = idRoom;
        this.path = path;
        this.name = name;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "ID_PHOTO", nullable = false, precision = 0)
    public Long getIdPhoto() {
        return idPhoto;
    }

    public void setIdPhoto(Long idPhoto) {
        this.idPhoto = idPhoto;
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
    @Column(name = "PATH", nullable = false)
    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    @Basic
    @Column(name = "NAME", nullable = false, length = 50)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Photo photo = (Photo) o;
        return Objects.equals(idPhoto, photo.idPhoto) &&
                Objects.equals(idRoom, photo.idRoom) &&
                Objects.equals(path, photo.path) &&
                Objects.equals(name, photo.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idPhoto, idRoom, path, name);
    }

    @Override
    public String toString() {
        return "Photo{" +
                "idPhoto=" + idPhoto +
                ", idRoom=" + idRoom +
                ", path='" + path + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
