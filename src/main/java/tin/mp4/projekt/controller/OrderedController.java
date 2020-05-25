package tin.mp4.projekt.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tin.mp4.projekt.exception.ResourceNotFoundException;
import tin.mp4.projekt.model.Ordered;
import tin.mp4.projekt.repository.OrderedRepository;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class OrderedController {
  private final Logger logger = LoggerFactory.getLogger(OrderedController.class);
  @Autowired
  private OrderedRepository orderedRepository;

  @GetMapping("/ordereds")
  public List<Ordered> getAllCities() {
    logger.info("Got request");
    return orderedRepository.findAll();
  }

  @GetMapping("/ordereds/{id}")
  public ResponseEntity<Ordered> getGuestById(@PathVariable(value = "id") Long idOrdered)
    throws ResourceNotFoundException {
    Ordered ordered = orderedRepository.findById(idOrdered)
      .orElseThrow(() -> new ResourceNotFoundException("Ordered not found for this id :: " + idOrdered));
    return ResponseEntity.ok().body(ordered);
  }

  @PostMapping("/ordereds")
  public Ordered createCity(@Valid @RequestBody Ordered ordered) {
    return orderedRepository.save(ordered);
  }

  @PutMapping("/ordereds/{id}")
  public ResponseEntity<Ordered> updateCity(@PathVariable(value = "id") Long idOrdered,
                                                 @Valid @RequestBody Ordered guestDetails) throws ResourceNotFoundException {
    Ordered ordered = orderedRepository.findById(idOrdered)
      .orElseThrow(() -> new ResourceNotFoundException("Ordered not found for this id :: " + idOrdered));

    ordered.setIdOrdered(guestDetails.getIdOrdered());
    ordered.setIdReservation(guestDetails.getIdReservation());
    ordered.setIdGuest(guestDetails.getIdGuest());
    final Ordered updatedEmployee = orderedRepository.save(ordered);
    return ResponseEntity.ok(updatedEmployee);
  }

  @DeleteMapping("/ordereds/{id}")
  public Map<String, Boolean> deleteGuest(@PathVariable(value = "id") Long idOrdered)
    throws ResourceNotFoundException {
    Ordered ordered = orderedRepository.findById(idOrdered)
      .orElseThrow(() -> new ResourceNotFoundException("Ordered not found for this id :: " + idOrdered));

    orderedRepository.delete(ordered);
    Map<String, Boolean> response = new HashMap<>();
    response.put("deleted", Boolean.TRUE);
    return response;
  }
}
