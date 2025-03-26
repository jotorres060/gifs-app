import { AfterViewInit, Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GiphyService } from '../../services/giphy.service';
import { Gif } from '../../interfaces/gif.interface';
import { ScrollStateService } from '../../../shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page',
  imports: [],
  templateUrl: './trending-page.component.html'
})
export default class TrendingPageComponent implements AfterViewInit {
  private giphyService = inject(GiphyService);
  private scrollStateService = inject(ScrollStateService);
  private divGroupScroll = viewChild<ElementRef<HTMLDivElement>>('divGroup');
  private isLoading = signal(false);
  private trendingPage = signal(0);
  public trendingGifs = signal<Gif[]>([]);
  public trendingGifsGroup = computed<Gif[][]>(() => {
    const groups = [];
    for (let index = 0; index < this.trendingGifs().length; index +=3) {
      groups.push(this.trendingGifs().slice(index, index + 3));
    }
    return groups;
  });;

  constructor() {
    this.loadTrengindGifs();
  }

  ngAfterViewInit(): void {
    const divGroupScroll = this.divGroupScroll()?.nativeElement;
    if (!divGroupScroll) return;

    divGroupScroll.scrollTop = this.scrollStateService.trendingScrollState();
  }

  public onScroll($event: Event) {
    const divGroupScroll = this.divGroupScroll()?.nativeElement;
    if (!divGroupScroll) return;

    const scrollTop = divGroupScroll.scrollTop;
    const clientHeight = divGroupScroll.clientHeight;
    const scrollHeight = divGroupScroll.scrollHeight;
    const isAtBottom = (scrollTop + clientHeight + 300) >= scrollHeight;
    this.scrollStateService.trendingScrollState.set(scrollTop);

    if (isAtBottom) {
      this.loadTrengindGifs();
    }
  }

  private loadTrengindGifs() {
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.giphyService.loadTrendingGifs(this.trendingPage()).subscribe({
      next: (items: Gif[]) => {
        this.trendingGifs.update((currentGifs) => [...currentGifs, ...items]);
        this.trendingPage.update((currentPage) => (currentPage + 1));
        this.isLoading.set(false);
      }
    });
  }
}
