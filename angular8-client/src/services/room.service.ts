import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Room} from "../models/room";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private baseUrl = 'http://localhost:8080/api/rooms';

  constructor(private http: HttpClient) { }

  getRoom(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getRoomByCity(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl+"/bycity/"}${id}`);
  }

  createRoom(guest: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, guest);
  }

  updateRoom(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteRoom(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getRoomList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getRoomByUser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/byuser/${id}`);
  }

  filterRoom(filter: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/filter`, filter);
  }

  filterRoomWithoutDate(filter: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/filterwithoutdate`, filter);
  }

  getRoomsFilterWithoutDateDetails(filter: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/filterwithoutdatedetails`, filter);
  }

  getRoomByHotelCity(idCity: number, idHotel: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/byhotelcity/${idCity}/${idHotel}`);
  }

  getRoomByHotel(idHotel: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/byhotel/${idHotel}`);
  }

  getFreeRoomByHotel(idHotel: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/freebyhotel/${idHotel}`);
  }

  getRoomListNotReserved(): Observable<any> {
    return this.http.get(`${this.baseUrl}/notreserved`);
  }
}
