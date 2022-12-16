import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../service/navigation.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  url = 'https://dummyjson.com/products/';
  idProduct: number;
  detailProduct: any;
  isEdit: boolean;
  base64textString: any;
  loading: boolean;
  thumbnail: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    public httpClient: HttpClient,
  ) { }

  ngOnInit() {
    const {
      snapshot: { queryParams },
    } = this.activatedRoute;
    console.log('queryParams',queryParams);
    if (queryParams) {
      this.idProduct = Number(queryParams?.['id']);
      if (!this.idProduct){
        this.navigationService.navigateForward('home');
      } else {
        this.getProduct();
      }
    }
  }

  async getProduct() {
    try {
      this.detailProduct = await fetch(this.url + this.idProduct).then(res => res.json());
      // this.detailProduct = await this.httpClient.get(this.url + this.idProduct).toPromise();
      console.log('detailProduct',this.detailProduct);
    } catch (error) {
      console.log('error',error);
    }
  }

  editData() {
    this.isEdit = this.isEdit ? false : true;
  }

  async updateProduct(id: any) {
    try {
      this.loading = true;
      // this.detailProduct.thumbnail = this.base64textString;
      const data: any = await fetch(this.url + this.idProduct, {
        method: 'PUT', /* or PATCH */
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: this.detailProduct.title,
          category: this.detailProduct.category,
          price: this.detailProduct.price,
          discountPercentage: this.detailProduct.discountPercentage,
          rating: this.detailProduct.rating,
          description: this.detailProduct.description,
          stock: this.detailProduct.stock,
          thumbnail: this.detailProduct.thumbnail,
        })
      })
      .then(res => res.json());
      this.loading = false;
      this.isEdit = false;
    } catch (error) {
      console.log(error);
    }
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

}
