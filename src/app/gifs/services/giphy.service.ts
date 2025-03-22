import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {
  private env = environment;
  private http = inject(HttpClient);

  constructor() {
    this.loadTrendingGifs();
  }

  public loadTrendingGifs() {
    return this.http.get<any>(`${ this.env.giphyApiUrl }/gifs/trending`, {
      params: {
        api_key: this.env.giphyApiKey,
        limit: 20
      }
    });
  }
}
