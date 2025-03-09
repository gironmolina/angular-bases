import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, Signal, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { type GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

const GIF_KEY = 'gifs';

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
  const gifs = JSON.parse(gifsFromLocalStorage);
  return gifs;
}

@Injectable({providedIn: 'root'})
export class GifService {
  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(false);
  private trendingPage = signal(0);

  trendingGifGroup: Signal<Gif[][]> = computed<Gif[][]>(() => {
    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i+=3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }

    return groups;
  })

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(()=> Object.keys(this.searchHistory()));

  constructor(){
    this.loadTrendingGifs();
  }

  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem('gifs', historyString);
  })

  loadTrendingGifs(){
    if (this,this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true);

    this.http.get<GiphyResponse>(
      `${ environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
          offset: this.trendingPage() * 20
        },
      }).subscribe((resp) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        this.trendingGifs.update(currentGifs => [...currentGifs, ...gifs]);
        this.trendingPage.update(page => page + 1);
        this.trendingGifsLoading.set(false);
      })
  }

  searchGifs(query:string):Observable<Gif[]> {
    return this.http.get<GiphyResponse>(
      `${ environment.giphyUrl}/gifs/search`, {
        params: {
          q: query,
          api_key: environment.giphyApiKey,
          limit: 20,
          rating: 'g'
        },
      }).pipe(
        map(({data}) => data),
        map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
        tap(items =>{
          this.searchHistory.update(history => ({
            ...history,
            [query.toLowerCase()]: items
          }))
        })
      );
  }

  getHistoryGifs(query:string):Gif[]{
    return this.searchHistory()[query] ?? [];
  }
}
