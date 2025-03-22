import { Component, inject } from '@angular/core';
import { GiphyService } from '../../services/giphy.service';
import { ActivatedRoute } from '@angular/router';
import { Gif } from '../../interfaces/gif.interface';
import { GifListComponent } from '../../components/gif-list/gif-list.component';

@Component({
  selector: 'app-history-page',
  imports: [GifListComponent],
  templateUrl: './history-page.component.html'
})
export default class HistoryPageComponent {
  private giphyService = inject(GiphyService);
  private actRoute = inject(ActivatedRoute);
  public query: string = '';
  public items: Gif[] = [];

  constructor() {
    this.actRoute.params.subscribe((params) => {
      this.query = params['query'];
      this.items = this.giphyService.getHistory(this.query);
    });
  }
}
