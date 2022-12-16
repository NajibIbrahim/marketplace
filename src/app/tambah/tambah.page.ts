import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../service/navigation.service';

@Component({
  selector: 'app-tambah',
  templateUrl: './tambah.page.html',
  styleUrls: ['./tambah.page.scss'],
})
export class TambahPage implements OnInit {
  title: any;
  category: any;
  price: any;
  discountPercentage: any;
  rating: any;
  description: any;
  stock: any;
  thumbnail: any;
  loading: boolean;
  base64textString: any;

  constructor(
    public httpClient: HttpClient,
    public navigationService: NavigationService,
  ) { }

  ngOnInit() {
  }

  handleFileSelect(evt: any){
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
        var reader = new FileReader();
        reader.onload =this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    // console.log(btoa(binaryString));
  }

  async save() {
    try {
      this.loading = true;
      this.thumbnail = this.base64textString;
      await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: this.title,
          category: this.category,
          price: this.price,
          discountPercentage: this.discountPercentage,
          rating: this.rating,
          description: this.description,
          stock: this.stock,
          thumbnail: this.thumbnail,
        })
      });
      this.loading = false;
      this.navigationService.navigateForward('home');
    } catch (error) {
      console.log('error',error);
    }
  }

}
