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

let coolDown = 0;

setInterval(() => {
    coolDown -= 1;
}, 1000);

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
        let coord = this.getRandomLocation();
        async function sendReport(rating: number) {
            //prevent spamming
            if (coolDown >= 0) {return}
            coolDown = 5;
            let body = new URLSearchParams({
                'latitude': coord.lat.toString(),
                'longitude': coord.long.toString(),
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
        document.getElementById('form')?.addEventListener("click", ()=>{
            coord = this.getRandomLocation();
            const rating: number = Number((<HTMLInputElement>document.getElementById('rating')).value);
            sendReport(rating);
            alert('Report sent!');
        });
    }


    getRandomLocation(): Coordinate {
        return {
            lat: centerCoords.lat + (Math.random() - 0.5)/2,
            long: centerCoords.long + (Math.random() - 0.5)
        };
    }

}
