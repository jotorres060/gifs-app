import { Component, input } from '@angular/core';

@Component({
  selector: 'app-gif-list-item',
  imports: [],
  templateUrl: './gif-list-item.component.html'
})
export class GifListItemComponent {
  public url = input.required<string>();
}
