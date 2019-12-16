import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { BlogEntry } from './types';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string) {}

  getBlogList(): Observable<BlogEntry[]> {
    return this.http.get<BlogEntry[]>(`${this.apiUrl}/github/blog-list`);
  }

  getBlogEntry(slug: string): Observable<BlogEntry> {
    return this.http.get<BlogEntry>(`${this.apiUrl}/github/blog-entry/${slug}`);
  }
}
