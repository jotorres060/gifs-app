import { Component, inject, signal } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GiphyService } from '../../services/giphy.service';
import { Gif } from '../../interfaces/gif.interface';
import { GifMapper } from '../../mapper/gif.mapper';

@Component({
  selector: 'app-trending-page',
  imports: [GifListComponent],
  templateUrl: './trending-page.component.html'
})
export default class TrendingPageComponent {
  public giphyService = inject(GiphyService);
  public trendingGifs = signal<Gif[]>([]);

  constructor() {
    this.loadTrengindGifs();
  }

  public loadTrengindGifs() {
    this.giphyService.loadTrendingGifs().subscribe({
      next: (response) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
        this.trendingGifs.set(gifs);
      }
    });
  }
}
