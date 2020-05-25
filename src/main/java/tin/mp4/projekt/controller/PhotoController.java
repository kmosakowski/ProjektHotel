package tin.mp4.projekt.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tin.mp4.projekt.exception.ResourceNotFoundException;
import tin.mp4.projekt.model.City;
import tin.mp4.projekt.model.Photo;
import tin.mp4.projekt.repository.PhotoRepository;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class PhotoController {
  private final Logger logger = LoggerFactory.getLogger(PhotoController.class);
  @Autowired
  private PhotoRepository photoRepository;

  @GetMapping("/photos")
  public List<Photo> getAllCities() {
    logger.info("Got request");
    return photoRepository.findAll();
  }

  @GetMapping("/photos/{id}")
  public ResponseEntity<Photo> getGuestById(@PathVariable(value = "id") Long idPhoto)
    throws ResourceNotFoundException {
    Photo photo = photoRepository.findById(idPhoto)
      .orElseThrow(() -> new ResourceNotFoundException("Photo not found for this id :: " + idPhoto));
    return ResponseEntity.ok().body(photo);
  }

  @PostMapping("/photos")
  public Photo createCity(@Valid @RequestBody Photo photo) {
    return photoRepository.save(photo);
  }

  @PutMapping("/photos/{id}")
  public ResponseEntity<Photo> updateCity(@PathVariable(value = "id") Long idPhoto,
                                                 @Valid @RequestBody Photo guestDetails) throws ResourceNotFoundException {
    Photo photo = photoRepository.findById(idPhoto)
      .orElseThrow(() -> new ResourceNotFoundException("Photo not found for this id :: " + idPhoto));

    photo.setIdPhoto(guestDetails.getIdPhoto());
    photo.setIdRoom(guestDetails.getIdRoom());
    photo.setPath(guestDetails.getPath());
    photo.setName(guestDetails.getName());
    final Photo updatedEmployee = photoRepository.save(photo);
    return ResponseEntity.ok(updatedEmployee);
  }

  @DeleteMapping("/photos/{id}")
  public Map<String, Boolean> deleteGuest(@PathVariable(value = "id") Long idPhoto)
    throws ResourceNotFoundException {
    Photo photo = photoRepository.findById(idPhoto)
      .orElseThrow(() -> new ResourceNotFoundException("Photo not found for this id :: " + idPhoto));

    photoRepository.delete(photo);
    Map<String, Boolean> response = new HashMap<>();
    response.put("deleted", Boolean.TRUE);
    return response;
  }

  @GetMapping("/photos/byroom/{id}")
  public List<Photo> getPhotoByRoom(@PathVariable(value = "id") Long roomId) {
    return photoRepository.findPhotoByRoom(roomId);
  }
}
