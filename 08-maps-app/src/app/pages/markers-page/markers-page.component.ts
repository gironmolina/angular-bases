import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl, { LngLat, LngLatLike } from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { JsonPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapboxKey;

interface Marker {
  id: string;
  mapboxMarker: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers-page',
  imports: [JsonPipe],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  markers = signal<Marker[]>([]);

  ngAfterViewInit() {
    if(!this.divElement()?.nativeElement) return;

    setTimeout(() => {
      const element = this.divElement()!.nativeElement;
      const map = new mapboxgl.Map({
        container: element,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [2.1734, 41.3851],
        zoom: 14,
      });

      this.mapListener(map);
    }, 80);
  }

  mapListener(map: mapboxgl.Map) {
    map.on('click', (event) => this.mapClick(event));

    this.map.set(map);
  }

  mapClick(event: mapboxgl.MapMouseEvent) {
    if (!this.map()) return;

    const map = this.map()!;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const coords = event.lngLat;

    const mapboxMarker = new mapboxgl.Marker({
        draggable: false,
        color: color
      })
      .setLngLat(coords)
      .setPopup(new mapboxgl.Popup().setHTML('<h1>Hola Mundo</h1>'))
      .addTo(map);

      const newMarker: Marker = {
        id: crypto.randomUUID(),
        mapboxMarker: mapboxMarker,
      };

      this.markers.update((markers) => [newMarker, ...markers]);
  }

  flyToMarker(lngLat: LngLatLike) {
    if (!this.map()) return;

    this.map()?.flyTo({
      center: lngLat,
    })
  }

  deleteMarker(marker: Marker) {
    if (!this.map()) return;

    const map = this.map()!;

    marker.mapboxMarker.remove();
    this.markers.update((markers) => markers.filter(m => m.id !== marker.id));
  }
}
