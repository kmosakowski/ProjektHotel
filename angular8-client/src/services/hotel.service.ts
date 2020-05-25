import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private baseUrl = 'http://localhost:8080/api/hotels';

  constructor(private http: HttpClient) { }

  getHotel(id: number): Observable<any>  {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createHotel(hotel: Object): Observable<any> {
    console.log("createHotel()");
    return this.http.post(`${this.baseUrl}`, hotel);
  }

  updateHotel(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteHotel(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getHotelList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getHotelByUser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/byuser/${id}`);
  }

  getHotelWithoutReservation(): Observable<any> {
    return this.http.get(`${this.baseUrl}/withoutReservation`);
  }
}
