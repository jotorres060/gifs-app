import { Gif } from "../interfaces/gif.interface";

export class GifMapper {
  static mapGiphyItemToGif(item: any): Gif {
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url
    }
  }

  static mapGiphyItemsToGifArray(items: any[]): Gif[] {
    return items.map(this.mapGiphyItemToGif);
  }
}
