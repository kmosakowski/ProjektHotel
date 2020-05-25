import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseUrl = 'http://localhost:8080/api/reservations';

  constructor(private http: HttpClient) { }

  getReservation(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createReservation(reservation: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, reservation);
  }

  updateReservation(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteReservation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getReservationList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getReservationByUserRoom(idUser: number, idRoom: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/${idUser}/${idRoom}`);
  }

  getReservationDetails(idHotel: number): Observable<any> {
    console.log("metoda getReservationDetails()");
    return this.http.get(`${this.baseUrl+"/details"}/${idHotel}`);
  }

  reservationDeleteByRoom(idRoom: number, idGuest: number) {
    return this.http.delete(`${this.baseUrl}/deletebyroom/${idRoom}/${idGuest}`);
  }
}
