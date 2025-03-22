import { Component, inject, signal } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GiphyService } from '../../services/giphy.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html'
})
export default class SearchPageComponent {
  private giphyService = inject(GiphyService);
  public searchedGifs = signal<Gif[]>([]);

  public onSearch(query: string) {
    this.giphyService.searchGifs(query).subscribe({
      next: (items: Gif[]) => {
        this.searchedGifs.set(items);
      }
    });
  }
}
