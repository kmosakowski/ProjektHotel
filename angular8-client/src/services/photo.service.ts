import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private baseUrl = 'http://localhost:8080/api/photos';

  constructor(private http: HttpClient) { }

  getPhoto(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createPhoto(guest: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, guest);
  }

  updatePhoto(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deletePhoto(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getPhotoList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getPhotoByRoom(id: number) {
    return this.http.get(`${this.baseUrl}/byroom/${id}`);
  }
}
