import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Site } from '../models/site.interface';

@Injectable({
  providedIn: 'root',
})
export class SitesService {
  private apiUrl = 'http://localhost:3000/api/sites';

  constructor(private http: HttpClient) {}

  getSites(): Observable<Site[]> {
    return this.http.get<Site[]>(this.apiUrl);
  }

  getSite(id: string): Observable<Site> {
    return this.http.get<Site>(`${this.apiUrl}/${id}`);
  }

  createSite(site: Omit<Site, 'id' | 'createdAt' | 'updatedAt'>): Observable<Site> {
    return this.http.post<Site>(this.apiUrl, site);
  }

  updateSite(id: string, site: Partial<Site>): Observable<Site> {
    return this.http.put<Site>(`${this.apiUrl}/${id}`, site);
  }

  deleteSite(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
