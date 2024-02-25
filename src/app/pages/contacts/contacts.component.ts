import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { dark } from '../../utils/google.maps.style';
import { MessageService } from '../../services/message.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrl: './contacts.component.css',
})
export class ContactsComponent implements AfterViewInit {

    @ViewChild(GoogleMap, { static: false }) map!: GoogleMap

    infoElements: any[] = [
        ["phone.png", "(72) 249-479"],
        ["mail.png", "hushazvillany@gmail.com"],
        ["address.png", "Dózsa György utca 2., Villány, Magyarország"]

    ]

    options: google.maps.MapOptions = {
        disableDefaultUI: true,
    }

    display: any;
    center: google.maps.LatLngLiteral = {
        lat: 45.869397872174225, lng: 18.455722901219165
    };
    zoom = 16;

    icon: any = {
        url: "/assets/images/logo.png",
        scaledSize: new google.maps.Size(48, 48),
    }

    markerOptions: google.maps.MarkerOptions = {draggable: false};
    markerPositions: google.maps.LatLngLiteral[] = [];
  
    addMarker(event: google.maps.MapMouseEvent) {
        
      this.markerPositions.push(event.latLng!.toJSON());
      console.log(event.latLng!.toJSON())
    }

    
    mapMarker: google.maps.LatLngLiteral = {
        lat: 45.869397872174225, lng: 18.455722901219165
    }
    

    constructor(private messageService: MessageService, private toast: NgToastService) {}
        
    ngAfterViewInit(): void {
        this.map.googleMap?.setOptions({styles: dark})
    }


    messageInput = {
        "name": "",
        "email": "",
        "messageContent": ""
    }

    sendMessage(): void {
        this.messageService.insertMessage(this.messageInput).subscribe((data) => {
            if (data.success === true) {
                this.toast.success({detail: "Siker", summary: "Sikeresen elküldted az üzenetet, várj míg válaszolnak rá!"})
            }
        })
    }
    
}
