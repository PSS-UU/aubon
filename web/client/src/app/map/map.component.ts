import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { interval } from 'rxjs';
import { environment } from 'src/environments/environment';


type Report = {
    user_id: number;
    rating: 0 | 1 | 2 | 3 | 4 | 5;
    time: string;
    longitude: number;
    latitude: number;
};

type Coordinate = {
    lat: number;
    long: number;
};

let centerCoords: Coordinate = {
    lat: 59.8585610,
    long: 17.6389242,
}

//TODO: Replace this list with an api call
let reportList: Report[] = [
    { user_id: 1, rating: 0, time: "just now", longitude: 17.61, latitude: 59.861 },
    { user_id: 2, rating: 1, time: "just now", longitude: 17.62, latitude: 59.862 },
    { user_id: 3, rating: 2, time: "just now", longitude: 17.63, latitude: 59.863 },
    { user_id: 4, rating: 3, time: "yesterday", longitude: 17.65, latitude: 59.84 },
    { user_id: 5, rating: 4, time: "three hours ago", longitude: 17.59, latitude: 59.843 },
    { user_id: 6, rating: 5, time: "just now", longitude: 17.64, latitude: 59.865 },
]

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
            center: [centerCoords.lat, centerCoords.long],
            zoom: 12,
            minZoom: 2,
            //maxZoom: 12,
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
        const reportURL = environment.url + "/get-reports";

        async function loadReports() {
            const response = await fetch(reportURL);
            const reports = await response.json();
            console.log(reports);
        }

        loadReports();
        this.drawReports(reportList);
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
        this.selfMarker.addTo(
            this.map
        ).bindPopup(
            "This is you!"
        );
        this.selfMarker.setLatLng([latitude, longitude])
    }


    private reportIcon0 = L.icon({
        iconUrl: 'assets/images/reporticon0.svg',
        iconSize: [20, 20],
        iconAnchor: [0, 10],
        popupAnchor: [8, -12],
    });
    private reportIcon1 = L.icon({
        iconUrl: 'assets/images/reporticon1.svg',
        iconSize: [20, 20],
        iconAnchor: [0, 10],
        popupAnchor: [8, -12],
    });
    private reportIcon2 = L.icon({
        iconUrl: 'assets/images/reporticon2.svg',
        iconSize: [20, 20],
        iconAnchor: [0, 10],
        popupAnchor: [8, -12],
    });
    private reportIcon3 = L.icon({
        iconUrl: 'assets/images/reporticon3.svg',
        iconSize: [20, 20],
        iconAnchor: [0, 10],
        popupAnchor: [8, -12],
    });
    private reportIcon4 = L.icon({
        iconUrl: 'assets/images/reporticon4.svg',
        iconSize: [20, 20],
        iconAnchor: [0, 10],
        popupAnchor: [8, -12],
    });
    private reportIcon5 = L.icon({
        iconUrl: 'assets/images/reporticon5.svg',
        iconSize: [20, 20],
        iconAnchor: [0, 10],
        popupAnchor: [8, -12],
    });

    selectIcon(number: number) {
        switch (number) {
            case 0:
                return this.reportIcon0;
            case 1:
                return this.reportIcon1;
            case 2:
                return this.reportIcon2;
            case 3:
                return this.reportIcon3;
            case 4:
                return this.reportIcon4;
            case 5:
                return this.reportIcon5;
            default:
                return this.reportIcon0;

        }
    }

    drawReports(reports: Report[]) {
        for (const index in reports) {
            L.marker([reports[index]['latitude'], reports[index]['longitude']]
            ).setIcon(
                this.selectIcon(reports[index]['rating'])
            ).bindPopup(
                `${reports[index]['rating']}/5 reported ${reports[index]['time']}.`
            ).addTo(this.map);
        }
    }

}
