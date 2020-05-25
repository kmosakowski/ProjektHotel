package tin.mp4.projekt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tin.mp4.projekt.model.Ordered;

@Repository
public interface OrderedRepository extends JpaRepository<Ordered, Long> {
}
