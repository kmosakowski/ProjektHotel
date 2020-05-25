package tin.mp4.projekt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tin.mp4.projekt.model.City;
import tin.mp4.projekt.model.Photo;

import java.util.List;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {

    @Query(value = "SELECT p.* FROM PHOTO p WHERE ID_ROOM = ?1", nativeQuery = true)
    List<Photo> findPhotoByRoom(Long ID_ROOM);


}
