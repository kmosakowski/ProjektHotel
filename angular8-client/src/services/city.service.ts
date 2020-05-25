import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private baseUrl = 'http://localhost:8080/api/cities';

  constructor(private http: HttpClient) { }

  getCity(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createCity(city: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, city);
  }

  updateCity(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteCity(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getCityList(): Observable<any> {
    console.log("metoda miast");
    return this.http.get(`${this.baseUrl}`);
  }

  getCityByUser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/byuser/${id}`);
  }

  getCityByHotel(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/byhotel/${id}`);
  }

  getCityWithoutReservation(): Observable<any> {
    return this.http.get(`${this.baseUrl}/withoutReservation`);
  }
}
