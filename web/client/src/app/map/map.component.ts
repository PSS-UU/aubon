import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { interval, reduce, Timestamp } from 'rxjs';
import { environment } from 'src/environments/environment';


type Report = {
    user_id: number;
    rating: 0 | 1 | 2 | 3 | 4 | 5 ;
    time: string;
  };

type Coordinate = {
    lat: number;
    long: number;
};

let uppsalaCentrum: Coordinate = {
    lat: 59.8585610,
    long: 17.6389242,
}

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
            center: [uppsalaCentrum.lat, uppsalaCentrum.long],
            zoom: 12,
            minZoom: 6,
            maxZoom: 12,
        })



        const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/albinantti/ckzh3jx4r009q14l8eb32614u/tiles/{z}/{x}/{y}?access_token=' + environment.token, {
            attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        });


        tiles.addTo(this.map);


    }


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


    updateSelfMarker(latitude: number, longitude: number) {
        console.log("Lat: " + latitude + " Long: " + longitude)
        this.selfMarker.addTo(
            this.map
        ).bindPopup(
            "This is you!"
        );

        this.selfMarker.setLatLng([latitude, longitude])
    }

    drawReports(reports: [Report]) {
        console.log(reports[0].rating)
        return;
    }

}
