import { Component, AfterViewInit } from '@angular/core';
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
    selector: 'app-report-form',
    templateUrl: './report-form.component.html',
    styleUrls: ['./report-form.component.scss']
})

export class FormComponent implements AfterViewInit {
    private initForm(): void {
    }

    ngAfterViewInit(): void {
        this.initForm();
        const coord = this.getLocation();
        async function sendReport(rating: number) {
            let body = new URLSearchParams({
                'longitude': coord.lat.toString(),
                'latitude': coord.long.toString(),
                'auroraRating': rating.toString(),
                'userID': (1).toString(),
            });
            const response = await fetch(environment.url + "/send-report", {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                },
                method: 'post',
                body: body,
            });
            
            if (!response.ok) { /* Handle */ }
        }
    }


    getLocation(): Coordinate {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                return { lat: position.coords.longitude, long: position.coords.latitude};
            });
        } else {
            console.log("No support for geolocation")
        }
        return({lat:0, long:0});
    }

}
