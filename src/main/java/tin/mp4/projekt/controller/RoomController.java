package tin.mp4.projekt.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tin.mp4.projekt.exception.ResourceNotFoundException;
import tin.mp4.projekt.model.Filter;
import tin.mp4.projekt.model.Room;
import tin.mp4.projekt.repository.RoomRepository;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class RoomController {
  private final Logger logger = LoggerFactory.getLogger(RoomController.class);
  @Autowired
  private RoomRepository roomRepository;

  @GetMapping("/rooms")
  public List<Room> getAllRooms() {
    logger.info("Got request");
    return roomRepository.findAll();
  }

  @GetMapping("/rooms/{id}")
  public ResponseEntity<Room> getRoomById(@PathVariable(value = "id") Long idPhoto)
    throws ResourceNotFoundException {
    Room room = roomRepository.findById(idPhoto)
      .orElseThrow(() -> new ResourceNotFoundException("Room not found for this id :: " + idPhoto));
    return ResponseEntity.ok().body(room);
  }

  @PostMapping("/rooms")
  public Room createRoom(@Valid @RequestBody Room room) {
    return roomRepository.save(room);
  }

  @PutMapping("/rooms/{id}")
  public ResponseEntity<Room> updateRoom(@PathVariable(value = "id") Long idPhoto,
                                                 @Valid @RequestBody Room guestDetails) throws ResourceNotFoundException {
    Room room = roomRepository.findById(idPhoto)
      .orElseThrow(() -> new ResourceNotFoundException("Room not found for this id :: " + idPhoto));

    room.setIdRoom(guestDetails.getIdRoom());
    room.setIdHotel(guestDetails.getIdHotel());
    room.setFloor(guestDetails.getFloor());
    room.setRoomNumber(guestDetails.getRoomNumber());
    room.setClazz(guestDetails.getClazz());
    room.setIsSmoker(guestDetails.getIsSmoker());
    room.setForDisabled(guestDetails.getForDisabled());
    room.setPrice(guestDetails.getPrice());
    room.setDescription(guestDetails.getDescription());
    final Room updatedEmployee = roomRepository.save(room);
    return ResponseEntity.ok(updatedEmployee);
  }

  @DeleteMapping("/rooms/{id}")
  public Map<String, Boolean> deleteRoom(@PathVariable(value = "id") Long idRoom)
    throws ResourceNotFoundException {
    logger.info("Deleting room");
    Room room = roomRepository.findById(idRoom)
      .orElseThrow(() -> new ResourceNotFoundException("Room not found for this id :: " + idRoom));

    roomRepository.delete(room);
    Map<String, Boolean> response = new HashMap<>();
    response.put("deleted", Boolean.TRUE);
    return response;
  }

  @GetMapping("/rooms/byhotel/{id}")
  public List<Room> getRoomsByCity(@PathVariable(value = "id") Long hotelId) {
    logger.info("Got hotels request");
    return roomRepository.findRoomsByHotel(hotelId);
  }

  @GetMapping("/rooms/freebyhotel/{id}")
  public List<Room> getFreeRoomsByCity(@PathVariable(value = "id") Long hotelId) {
    logger.info("Got hotels request");
    return roomRepository.findFreeRoomsByHotel(hotelId);
  }

  @GetMapping("/rooms/byuser/{id}")
  public List<RoomRepository.RoomDetailsInterface> getRoomsByUser(@PathVariable(value = "id") Long userId) {
    return roomRepository.roomsByUser(userId);
  }

  @PostMapping("/rooms/filter")
  public List<RoomRepository.RoomDetailsInterface> getRoomsFilter(@Valid @RequestBody Filter filter) {
    return roomRepository.roomsFilter(filter.getCityId(), filter.getHotelId(), filter.getchosenDate(), filter.getUserId());
  }

  @PostMapping("/rooms/filterwithoutdate")
  public List<Room> getRoomsFilterWithoutDate(@Valid @RequestBody Filter filter) {
    logger.info(filter.toString());
    return roomRepository.roomsFilterWithoutDate(filter.getCityId(), filter.getHotelId());
  }

  @PostMapping("/rooms/filterwithoutdatedetails")
  public List<RoomRepository.RoomDetailsInterface> getRoomsFilterWithoutDateDetails(@Valid @RequestBody Filter filter) {
    logger.info(filter.toString());
    return roomRepository.roomsFilterWithoutDateDetails(filter.getCityId(), filter.getHotelId(), filter.getUserId());
  }

  @PostMapping("/rooms/byhotelcity/{cityid}/{hotelid}")
  public List<Room> getRoomsByHotelCity(@PathVariable(value = "cityid") Long cityId, @PathVariable(value = "hotelid") Long hotelId) {
    logger.info("get rooms by hote and city");
    return roomRepository.roomsByHotelCity(cityId, hotelId);
  }

  @GetMapping("/rooms/notreserved")
  public List<Room> RoomsNotReserved() {
    logger.info("Got request");
    return roomRepository.findRoomsNotReserved();
  }

}
