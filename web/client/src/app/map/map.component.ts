import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { interval, reduce } from 'rxjs';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
    private map: any;
    private selfMarker: any;

    private initMap(): void {
        this.map = L.map('map', {
            center: [59.85856101848495, 17.638924284191386],
            zoom: 3,
            minZoom: 3,
            maxZoom: 12,
            maxBounds: [[-90, -360], [90, 360]],
            maxBoundsViscosity: 1.0
        })

        const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/albinantti/ckzh3jx4r009q14l8eb32614u/tiles/{z}/{x}/{y}?access_token=' + environment.token, {
            attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        });

        tiles.addTo(this.map);

        L.imageOverlay(
            environment.path_to_aurora_overlay,
            [[90, -630], [-90, -270]],
            { errorOverlayUrl: "assets/images/aurora_error.png" }
        ).addTo(this.map);
        L.imageOverlay(
            environment.path_to_aurora_overlay,
            [[90, -270], [-90, 90]],
            { errorOverlayUrl: "assets/images/aurora_error.png" }
        ).addTo(this.map);
        L.imageOverlay(
            environment.path_to_aurora_overlay,
            [[90, 90], [-90, 450]],
            { errorOverlayUrl: "assets/images/aurora_error.png" }
        ).addTo(this.map);
    }


    constructor() { }


    ngAfterViewInit(): void {
        this.initMap();

        var userMapIcon = L.icon({
            iconUrl: 'assets/images/user-astronaut-solid.svg',
            iconSize: [20, 20],
            iconAnchor: [0, 10],
            popupAnchor: [0, -12],
        });

        this.selfMarker = L.marker([59.858, 17.639],
            { icon: userMapIcon }
        )

        interval(5000).subscribe(x => {
            this.getLocation();
        });
    }


    getLocation(): void {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const longitude = position.coords.longitude;
                const latitude = position.coords.latitude;
                this.updateSelfMarker(latitude, longitude);
            });
        } else {
            console.log("No support for geolocation")
        }
    }


    updateSelfMarker(Latitude: number, Longitude: number) {
        console.log("Lat: " + Latitude + " Long: " + Longitude)
        this.selfMarker.addTo(
            this.map
        ).bindPopup(
            "This is you!"
        );

        this.selfMarker.setLatLng([Latitude, Longitude])
    }
}
