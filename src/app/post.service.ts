import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:3000/api/posts'; // Update this URL based on your backend

  constructor(private http: HttpClient) {}

  createPost(post: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, post);
  }

  listPosts(params: any): Observable<any> {
    return this.http.get(`${this.apiUrl}`, { params });
  }

  updatePost(id: string, post: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, post);
  }

  deletePost(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  searchPosts(query: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/search`, {
      params: { q: query },
    });
  }

  aggregatePosts(): Observable<any> {
    return this.http.get(`http://localhost:3000/api/aggregate`);
  }

  advancedAggregation(): Observable<any> {
    return this.http.get(`http://localhost:3000/api/advanced-aggregate`);
  }
}
