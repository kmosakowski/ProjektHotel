package tin.mp4.projekt.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tin.mp4.projekt.exception.ResourceNotFoundException;
import tin.mp4.projekt.model.City;
import tin.mp4.projekt.model.Hotel;
import tin.mp4.projekt.repository.CityRepository;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class CityController {
  private final Logger logger = LoggerFactory.getLogger(CityController.class);
  @Autowired
  private CityRepository cityRepository;

  @GetMapping("/cities")
  public List<City> getAllCities() {
    logger.info("Got request [getAllCities]");
    return cityRepository.findAll();
  }

  @GetMapping("/cities/{id}")
  public ResponseEntity<City> getCityById(@PathVariable(value = "id") Long cityId)
          throws ResourceNotFoundException {
    City city = cityRepository.findById(cityId)
            .orElseThrow(() -> new ResourceNotFoundException("City not found for this id :: " + cityId));
    return ResponseEntity.ok().body(city);
  }

  @GetMapping("/cities/byhotel/{id}")
  public List<City> getAllCitiesByHotel(@PathVariable(value = "id") Long hotelId) {
    return cityRepository.findCityByHotel(hotelId);
  }

  @PostMapping("/cities")
  public City createCity(@Valid @RequestBody City city) {
    return cityRepository.save(city);
  }

  @PutMapping("/cities/{id}")
  public ResponseEntity<City> updateCity(@PathVariable(value = "id") Long cityId,
                                         @Valid @RequestBody City cityDetails) throws ResourceNotFoundException {
    City city = cityRepository.findById(cityId)
            .orElseThrow(() -> new ResourceNotFoundException("City not found for this id :: " + cityId));

    city.setIdCity(cityDetails.getIdCity());
    city.setCityName(cityDetails.getCityName());
    final City updatedEmployee = cityRepository.save(city);
    return ResponseEntity.ok(updatedEmployee);
  }

  @DeleteMapping("/cities/{id}")
  public Map<String, Boolean> deleteCity(@PathVariable(value = "id") Long cityId)
          throws ResourceNotFoundException {
    City city = cityRepository.findById(cityId)
            .orElseThrow(() -> new ResourceNotFoundException("City not found for this id :: " + cityId));

    cityRepository.delete(city);
    Map<String, Boolean> response = new HashMap<>();
    response.put("deleted", Boolean.TRUE);
    return response;
  }

  @GetMapping("/cities/byuser/{id}")
  public List<City> getRoomsByUser(@PathVariable(value = "id") Long userId) {
    return cityRepository.cityByUser(userId);
  }

  @GetMapping("/cities/withoutReservation")
  public List<City> getRoomsByUser() {
    return cityRepository.cityWithoutReservation();
  }
}
