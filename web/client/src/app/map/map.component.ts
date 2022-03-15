import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { interval } from 'rxjs';
import { environment } from 'src/environments/environment';


type Report = {
    id: number;
    rating: 0 | 1 | 2 | 3 | 4 | 5;
    timestamp: string;
    image: string | null;
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

let reportList: Report[] = []

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
            minZoom: 3,
            maxBounds: [[-90, -360], [90, 360]],
            maxBoundsViscosity: 0.75
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


    ngAfterViewInit(): void {
        this.initMap();
        let reportLayer = L.layerGroup().addTo(this.map);

        async function loadReports() {
            const response = await fetch(environment.url + "/get-reports");
            const reports = await response.json();
            reportList = reports;
        }

        var userMapIcon = L.icon({
            iconUrl: 'assets/images/user-astronaut-solid.svg',
            iconSize: [20, 20],
            iconAnchor: [10, 10],
            popupAnchor: [0, -12],
        });

        this.selfMarker = L.marker([59.858, 17.639],
            { icon: userMapIcon }
        )

        interval(1000).subscribe(x => {
            reportLayer.clearLayers();
            loadReports();
            this.getLocation();
            console.log(reportList);
            this.drawReports(reportList, reportLayer);
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


    drawReports(reports: Report[], layer: any) {
        for (const index in reports) {
            let time = new Date(reports[index]['timestamp'])
            let hours = ("0" + time.getHours()).slice(-2);
            let minutes = ("0" + time.getMinutes()).slice(-2);
            L.marker([reports[index]['latitude'], reports[index]['longitude']]
            ).setIcon(
                this.selectIcon(reports[index]['rating'])
            ).bindPopup(
                `${reports[index]['rating']}/5 reported at ${hours}:${minutes}.`
            ).addTo(layer);
        }
    }

}
