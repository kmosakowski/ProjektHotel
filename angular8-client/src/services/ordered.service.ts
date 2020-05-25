import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderedService {

  private baseUrl = 'http://localhost:8080/api/ordereds';

  constructor(private http: HttpClient) { }

  getOrdered(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createOrdered(guest: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, guest);
  }

  updateOrdered(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteOrdered(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getOrderedList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
