import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationService } from '../service/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  url = 'https://dummyjson.com/products';
  allProduct: any;
  allcategory: any;
  category: any;
  showInput: any;
  inputSearch: any;
  limit: number;

  constructor(
    private httpClient: HttpClient,
    private navigationService: NavigationService,
  ) {}

  async ngOnInit() {
    this.getAllProduct();
    this.getCategory();
  }

  async getAllProduct() {
    try {
      this.category = '';
      const data: any = await fetch(this.url).then(res => res.json());
      // const data: any = await this.httpClient.get(this.url).toPromise();
      this.allProduct = data.products;
      console.log('allProduct',this.allProduct);
    } catch (error) {
      console.log('error',error);
    }
  }

  async getCategory() {
    try {
      const func = '/categories';
      this.allcategory = await fetch(this.url + func).then(res => res.json());
      // this.allcategory = await this.httpClient.get(this.url + func).toPromise();
      console.log('allcategory',this.allcategory);
    } catch (error) {
      console.log('error',error);
    }
  }

  detail(id: any) {
    console.log('id',id);
    this.navigationService.navigateForward('detail', {
      queryParams: {
        id: id,
      },
    });
  }

  async productCategory(category: string) {
    try {
      this.category = category;
      const func = '/category/' + category;
      const data: any = await fetch(this.url + func).then(res => res.json());
      // const data: any = await this.httpClient.get(this.url + func).toPromise();
      this.allProduct = data.products;
      console.log('category',this.allProduct);
    } catch (error) {
      console.log('error',error);
    }
  }

  async search(input: any) {
    try {
      this.inputSearch = input?.target?.value;
      const func = '/search?q=' + this.inputSearch;
      const data: any = await fetch(this.url + func).then(res => res.json());
      // const data: any = await this.httpClient.get(this.url + func).toPromise();
      this.allProduct = data.products;
    } catch (error) {
      console.log('error',error);
    }
  }

  async handleChange(e: any) {
    try {
      console.log('ee',e);
      const func = '?limit=' + e.detail.value;
      const data:any = await fetch(this.url + func).then(res => res.json());
      this.allProduct = data.products;
      // await this.httpClient.delete(this.url + func)).toPromise();
    } catch (error) {
      console.log('error',error);
    }
  }

  pushLog(msg: any) {
    console.log('msg',msg);
    if(msg === 'ionCancel fired') {
      this.limit = 0;
      this.getAllProduct();
    }
  }

  async delete(id: number) {
    try {
      await fetch(this.url + '/' + id).then(res => res.json());
      // await this.httpClient.delete(this.url + id).toPromise();
    } catch (error) {
      console.log('error',error);
    }
  }

}
