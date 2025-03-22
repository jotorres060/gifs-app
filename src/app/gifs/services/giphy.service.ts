import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable, tap } from 'rxjs';
import { GifMapper } from '../mapper/gif.mapper';
import { Gif } from '../interfaces/gif.interface';

function loadGifsFromLocalStorage() {
  const GIFS_LOCAL_STORAGE_KEY = 'gifs';
  const history = localStorage.getItem(GIFS_LOCAL_STORAGE_KEY) ?? '{}';
  const gifs = JSON.parse(history);
  return gifs;
}

@Injectable({
  providedIn: 'root'
})
export class GiphyService {
  private env = environment;
  private http = inject(HttpClient);
  private searchHistory = signal<Record<string, Gif[]>>(loadGifsFromLocalStorage());
  private searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));
  private GIFS_LOCAL_STORAGE_KEY = 'gifs';

  constructor() {
    this.loadTrendingGifs();
  }

  public saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem(this.GIFS_LOCAL_STORAGE_KEY, historyString);
  });

  public loadTrendingGifs(): Observable<Gif[]> {
    return this.http.get<any>(`${ this.env.giphyApiUrl }/gifs/trending`, {
      params: {
        api_key: this.env.giphyApiKey,
        limit: 20
      }
    })
    .pipe(
      map(({ data }) => GifMapper.mapGiphyItemsToGifArray(data))
    );
  }

  public searchGifs(query: string): Observable<Gif[]> {
    return this.http.get<any>(`${ this.env.giphyApiUrl }/gifs/search`, {
      params: {
        api_key: this.env.giphyApiKey,
        q: query,
        limit: 20
      }
    })
    .pipe(
      map(({ data }) => GifMapper.mapGiphyItemsToGifArray(data)),
      tap((items: Gif[]) => {
        this.searchHistory.update((history) => ({
          ...history,
          [query.toLowerCase()]: items
        }));
      })
    );
  }

  public getSearchHistoryKeys(): string[] {
    return this.searchHistoryKeys();
  }

  public getHistory(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }
}
