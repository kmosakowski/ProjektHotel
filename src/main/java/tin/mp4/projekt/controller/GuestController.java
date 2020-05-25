package tin.mp4.projekt.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tin.mp4.projekt.exception.ResourceNotFoundException;
import tin.mp4.projekt.model.Guest;
import tin.mp4.projekt.model.Passwords;
import tin.mp4.projekt.repository.GuestRepository;
import tin.mp4.projekt.repository.HotelRepository;
import tin.mp4.projekt.repository.PasswordsRepository;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class GuestController {
  private final Logger logger = LoggerFactory.getLogger(GuestController.class);
  @Autowired
  private GuestRepository guestRepository;



  @GetMapping("/guests")
  public List<Guest> getAllCities() {
    logger.info("Got request");
    return guestRepository.findAll();
  }

  @GetMapping("/guests/{id}")
  public ResponseEntity<Guest> getGuestById(@PathVariable(value = "id") Long idGuest)
    throws ResourceNotFoundException {
    Guest guest = guestRepository.findById(idGuest)
      .orElseThrow(() -> new ResourceNotFoundException("Guest not found for this id :: " + idGuest));
    return ResponseEntity.ok().body(guest);
  }

  @PostMapping("/guests")
  public Guest createCity(@Valid @RequestBody Guest guest) {
    return guestRepository.save(guest);
  }

  @PutMapping("/guests/{id}")
  public ResponseEntity<Guest> updateCity(@PathVariable(value = "id") Long idGuest,
                                                 @Valid @RequestBody Guest guestDetails) throws ResourceNotFoundException {
    Guest guest = guestRepository.findById(idGuest)
      .orElseThrow(() -> new ResourceNotFoundException("Guest not found for this id :: " + idGuest));

    guest.setIdGuest(guestDetails.getIdGuest());
    guest.setName(guestDetails.getName());
    guest.setSurname(guestDetails.getSurname());
    guest.setBirthDate(guestDetails.getBirthDate());
    guest.setPhone(guestDetails.getPhone());
    guest.setIdPassword(guestDetails.getIdPassword());
    final Guest updatedEmployee = guestRepository.save(guest);
    return ResponseEntity.ok(updatedEmployee);
  }

  @DeleteMapping("/guests/{id}")
  public Map<String, Boolean> deleteGuest(@PathVariable(value = "id") Long idGuest)
    throws ResourceNotFoundException {
    Guest guest = guestRepository.findById(idGuest)
      .orElseThrow(() -> new ResourceNotFoundException("Guest not found for this id :: " + idGuest));

    guestRepository.delete(guest);
    Map<String, Boolean> response = new HashMap<>();
    response.put("deleted", Boolean.TRUE);
    return response;
  }
}
