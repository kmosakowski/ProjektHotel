package tin.mp4.projekt.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tin.mp4.projekt.exception.ResourceNotFoundException;
import tin.mp4.projekt.model.Passwords;
import tin.mp4.projekt.repository.PasswordsRepository;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class PasswordsController {
  private final Logger logger = LoggerFactory.getLogger(PasswordsController.class);
  @Autowired
  private PasswordsRepository passwordsRepository;

  @GetMapping("/passwords")
  public List<Passwords> getAllPasswords() {
    logger.info("Got request [getAllPasswords]");
    return passwordsRepository.findAll();
  }

  @GetMapping("/passwords/{id}")
  public ResponseEntity<Passwords> getPasswordsById(@PathVariable(value = "id") Long idPassword)
    throws ResourceNotFoundException {
    Passwords password = passwordsRepository.findById(idPassword)
      .orElseThrow(() -> new ResourceNotFoundException("Passwords not found for this id :: " + idPassword));
    return ResponseEntity.ok().body(password);
  }

  @PostMapping("/passwords")
  public Passwords createPasswords(@Valid @RequestBody Passwords password) {
    logger.info("post [createPasswords]");
    logger.info(password.toString());
    return passwordsRepository.save(password);
  }

  @PutMapping("/passwords/{id}")
  public ResponseEntity<Passwords> updatePasswords(@PathVariable(value = "id") Long idPassword,
                                                 @Valid @RequestBody Passwords guestDetails) throws ResourceNotFoundException {
    Passwords password = passwordsRepository.findById(idPassword)
      .orElseThrow(() -> new ResourceNotFoundException("Passwords not found for this id :: " + idPassword));

    password.setIdPassword(guestDetails.getIdPassword());
    password.setPassword(guestDetails.getPassword());
    password.setLogin(guestDetails.getLogin());
    final Passwords updatedEmployee = passwordsRepository.save(password);
    return ResponseEntity.ok(updatedEmployee);
  }

  @DeleteMapping("/passwords/{id}")
  public Map<String, Boolean> deletePasswords(@PathVariable(value = "id") Long idPassword)
    throws ResourceNotFoundException {
    Passwords password = passwordsRepository.findById(idPassword)
      .orElseThrow(() -> new ResourceNotFoundException("Passwords not found for this id :: " + idPassword));

    passwordsRepository.delete(password);
    Map<String, Boolean> response = new HashMap<>();
    response.put("deleted", Boolean.TRUE);
    return response;
  }

  //TODO: Zmienić pass i login przenieść do body
  @GetMapping("/passwords/isExist/{pass}/{login}")
  public Integer isExist(@PathVariable(value = "pass") String pass, @PathVariable(value = "login") String login) {
    logger.info("get [isExist]");
    return passwordsRepository.isExist(pass, login);
  }

  //TODO: Zmienić pass i login przenieść do body
  @GetMapping("/passwords/userPass/{pass}/{login}")
  public PasswordsRepository.UserPassInterface getUserPass(@PathVariable(value = "pass") String pass, @PathVariable(value = "login") String login) {
    logger.info("get [getUserPass]");
    return passwordsRepository.getUserPass(pass, login);
  }
}
