
import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
    private map: any;

    private initMap(): void {
        this.map = L.map('map', {
            center: [59.85856101848495, 17.638924284191386],
            zoom: 12,
            minZoom: 6,
            maxZoom: 12,
        })

        const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/albinantti/ckzh3jx4r009q14l8eb32614u/tiles/{z}/{x}/{y}?access_token=' + environment.token, {
            attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        });


        tiles.addTo(this.map);

    }



    constructor() { }

    ngAfterViewInit(): void {
        this.initMap();
    }
}
