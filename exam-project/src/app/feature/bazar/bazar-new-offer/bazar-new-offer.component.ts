import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { OfferService } from 'src/app/core/offer.service';

@Component({
  selector: 'app-bazar-new-offer',
  templateUrl: './bazar-new-offer.component.html',
  styleUrls: ['./bazar-new-offer.component.css']
})
export class BazarNewOfferComponent implements OnInit {

  offerPhoto?: File 

  
  handleOfferPhotoUpload(event: InputEvent){
    const input: HTMLInputElement = event.target as HTMLInputElement;
    this.offerPhoto = input.files[0]
    console.log( "this.offerPhoto" + this.offerPhoto)
  }

  addOfferForm: FormGroup = new FormGroup({
    offerName: new FormControl(''),
    buyOrSell: new FormControl(''),
    cameraOrLens: new FormControl(''),
    offerPhoto: new FormControl(''),
    offerDescription: new FormControl(''),
    offerContact: new FormControl(''),
  })

  constructor(private httpClient: HttpClient,
    private offerService: OfferService, private router: Router) { }

  ngOnInit(): void {
  }


  submitNewOffer(addOfferForm: NgForm): void {
    console.log('offer form' + addOfferForm.value);
    console.log("this.photo from form" + this.offerPhoto)
    this.offerService.addOffer$( addOfferForm.value).subscribe({
      next: (offer) => {
        this.router.navigate(['/offers'])
      },
      error: (error) => {
        console.error(error)
      }
    })
  }
  navigateToHome(){
    this.router.navigate(['/home']);
  }

}
