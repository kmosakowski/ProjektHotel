package tin.mp4.projekt.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tin.mp4.projekt.exception.ResourceNotFoundException;
import tin.mp4.projekt.model.Hotel;
import tin.mp4.projekt.model.Room;
import tin.mp4.projekt.repository.HotelRepository;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class HotelController {
  private final Logger logger = LoggerFactory.getLogger(HotelController.class);
  @Autowired
  private HotelRepository hotelRepository;

  @GetMapping("/hotels")
  public List<Hotel> getAllCities() {
    logger.info("Got request");
    return hotelRepository.findAll();
  }

  @GetMapping("/hotels/{id}")
  public ResponseEntity<Hotel> getGuestById(@PathVariable(value = "id") Long idHotel)
    throws ResourceNotFoundException {
    Hotel hotel = hotelRepository.findById(idHotel)
      .orElseThrow(() -> new ResourceNotFoundException("Hotel not found for this id :: " + idHotel));
    return ResponseEntity.ok().body(hotel);
  }

  @PostMapping("/hotels")
  public Hotel createCity(@Valid @RequestBody Hotel hotel) {
    return hotelRepository.save(hotel);
  }

  @PutMapping("/hotels/{id}")
  public ResponseEntity<Hotel> updateCity(@PathVariable(value = "id") Long idHotel,
                                                 @Valid @RequestBody Hotel guestDetails) throws ResourceNotFoundException {
    Hotel hotel = hotelRepository.findById(idHotel)
      .orElseThrow(() -> new ResourceNotFoundException("Hotel not found for this id :: " + idHotel));

    hotel.setIdHotel(guestDetails.getIdHotel());
    hotel.setName(guestDetails.getName());
    hotel.setAddress(guestDetails.getAddress());
    hotel.setClassStar(guestDetails.getClassStar());
    hotel.setParking(guestDetails.getParking());
    hotel.setIdCity(guestDetails.getIdCity());
    hotel.setIdPassword(guestDetails.getIdPassword());
    final Hotel updatedEmployee = hotelRepository.save(hotel);
    return ResponseEntity.ok(updatedEmployee);
  }

  @DeleteMapping("/hotels/{id}")
  public Map<String, Boolean> deleteGuest(@PathVariable(value = "id") Long idHotel)
    throws ResourceNotFoundException {
    Hotel hotel = hotelRepository.findById(idHotel)
      .orElseThrow(() -> new ResourceNotFoundException("Hotel not found for this id :: " + idHotel));

    hotelRepository.delete(hotel);
    Map<String, Boolean> response = new HashMap<>();
    response.put("deleted", Boolean.TRUE);
    return response;
  }

  @GetMapping("/hotels/byuser/{id}")
  public List<Hotel> getRoomsByUser(@PathVariable(value = "id") Long userId) {
    return hotelRepository.hotelByUser(userId);
  }

  @GetMapping("/hotels/withoutReservation")
  public List<Hotel> getRoomsByUser() {
    return hotelRepository.hotelWithoutReservation();
  }
}
