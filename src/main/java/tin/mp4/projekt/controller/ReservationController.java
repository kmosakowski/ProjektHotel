package tin.mp4.projekt.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tin.mp4.projekt.exception.ResourceNotFoundException;
import tin.mp4.projekt.model.Reservation;
import tin.mp4.projekt.model.Room;
import tin.mp4.projekt.repository.PasswordsRepository;
import tin.mp4.projekt.repository.ReservationRepository;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class ReservationController {
    private final Logger logger = LoggerFactory.getLogger(ReservationController.class);
    @Autowired
    private ReservationRepository reservationRepository;

    @GetMapping("/reservations")
    public List<Reservation> getAllReseervations() {
        logger.info("Got request");
        return reservationRepository.findAll();
    }

    @GetMapping("/reservations/{id}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable(value = "id") Long idReservation)
            throws ResourceNotFoundException {
        Reservation ordered = reservationRepository.findById(idReservation)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found for this id :: " + idReservation));
        return ResponseEntity.ok().body(ordered);
    }

    @PostMapping("/reservations")
    public Reservation createReservation(@Valid @RequestBody Reservation ordered) {
        return reservationRepository.save(ordered);
    }

    @PutMapping("/reservations/{id}")
    public ResponseEntity<Reservation> updateReservation(@PathVariable(value = "id") Long idReservation, @Valid @RequestBody Reservation guestDetails) throws ResourceNotFoundException {
        Reservation ordered = reservationRepository.findById(idReservation)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found for this id :: " + idReservation));

        ordered.setIdReservation(guestDetails.getIdReservation());
        ordered.setIdRoom(guestDetails.getIdRoom());
        ordered.setIdGuest(guestDetails.getIdGuest());
        ordered.setFromDate(guestDetails.getFromDate());
        ordered.setToDate(guestDetails.getToDate());
        ordered.setComments(guestDetails.getComments());
        ordered.setCanceled(guestDetails.getCanceled());
        final Reservation updatedEmployee = reservationRepository.save(ordered);
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("/reservations/{id}")
    public Map<String, Boolean> deleteReservation(@PathVariable(value = "id") Long idReservation)
            throws ResourceNotFoundException {
        Reservation reservation = reservationRepository.findById(idReservation)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found for this id :: " + idReservation));

        reservationRepository.delete(reservation);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    @GetMapping("/reservations/{idUser}/{idRoom}")
    public List<Reservation> reservationByUserRoom(@PathVariable(value = "idUser") Long userId, @PathVariable(value = "idRoom") Long roomId) {
        return reservationRepository.reservationByUserRoom(userId, roomId);
    }

    @GetMapping("reservations/details/{idHotel}")
    public List<ReservationRepository.ReservationDetailsInterface> getReservationDetails(@PathVariable(value = "idHotel") Long hotelId) {
        logger.info("get [getdetails]");
        return reservationRepository.getReservationDetails(hotelId);
    }

    @DeleteMapping("reservations/deletebyroom/{idRoom}/{idGuest}")
    public Integer reservationDeleteByRoom(@PathVariable(value = "idRoom") Long roomlId, @PathVariable(value = "idGuest") Long guestId) {
        logger.info("new delete");
        return reservationRepository.reservationDeleteByRoom(roomlId, guestId);
    }
}
