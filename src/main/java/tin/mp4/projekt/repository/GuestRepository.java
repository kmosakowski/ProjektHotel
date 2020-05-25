package tin.mp4.projekt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tin.mp4.projekt.model.Guest;

@Repository
public interface GuestRepository extends JpaRepository<Guest, Long> {

}
