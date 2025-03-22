import { Component, inject, signal } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GiphyService } from '../../services/giphy.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-trending-page',
  imports: [GifListComponent],
  templateUrl: './trending-page.component.html'
})
export default class TrendingPageComponent {
  private giphyService = inject(GiphyService);
  public trendingGifs = signal<Gif[]>([]);

  constructor() {
    this.loadTrengindGifs();
  }

  public loadTrengindGifs() {
    this.giphyService.loadTrendingGifs().subscribe({
      next: (items: Gif[]) => this.trendingGifs.set(items)
    });
  }
}
