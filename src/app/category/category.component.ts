import { Component, ElementRef, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { BASE_API_URL } from 'config';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
@Injectable()
export class CategoryComponent implements OnInit {
  public tabConfig = {
    currentSelectedTab: undefined,
  };
  categoryList: Array<any> = [];
  productList: Array<any> = [];
  displayCategoryList: boolean = true;
  displayProductList: boolean = false;
  currentCategory!: String;
  currentCategoryObject!: Object;
  pagesize: number = 2;
  page: number = 1;
  totalCount: number = 0;
  totalPages: number = 0;
  pageArray!: Array<number>;
  category_id: Array<String> = [];
  stateSubscription: any;
  link = BASE_API_URL;
  constructor(
    private httpClient: HttpClient,
    private changeDetectorRef: ChangeDetectorRef,
    private util: UtilityService
  ) {}

  ngOnInit(): void {
    console.log(this.displayCategoryList, this.displayProductList);
    /* subscribe to the BehaviorSubject to toggle between Category and Products Division */
    /* catalogueState state emits value when navigation menu is clicked under navmenu.component.ts*/
    this.stateSubscription = this.util.catalogueState.subscribe(
      (stateValue: boolean) => {
        console.log(stateValue);
        if (stateValue === true) {
          this.getCategory();
          console.log(this.categoryList);
          this.displayCategoryList = true;
          this.displayProductList = false;
        } else if (stateValue === false) {
          this.displayCategoryList = false;
          this.displayProductList = true;
        }
        this.changeDetectorRef.detectChanges();
        //to reset view based on the variables displayCategoryList and displayProductList
      }
    );
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }

  /*==========================================================================
  *  Function to Get All The Products for a Category                         *
  ===========================================================================*/
  getProductList(item: any) {
    let key: any = Object.keys(item)[0];
    this.currentCategory = key;
    this.currentCategoryObject = item;
    let id: any = item[key];

    let link =
      BASE_API_URL +
      `/products?category_id=${id}&pagesize=${this.pagesize}&page=${this.page}`;
    console.log('LINK: ' + link);
    this.categoryList = [];
    let index = 0;
    this.pageArray = [];
    let subscription = this.httpClient.get(link).subscribe({
      next: (response: any) => {
        //console.log('The RESPONSE: ' + JSON.stringify(response));
        this.productList = response.slice(0, response.length - 1);
        //console.log('PRODUCT LIST', this.productList);
        this.totalCount = response[response.length - 1];
        this.totalPages = Math.ceil(this.totalCount / this.pagesize);
        while (index != this.totalPages) {
          this.pageArray[index] = index + 1;
          index++;
        }
        console.log(this.pageArray);
        subscription.unsubscribe();
        this.util.setCatalogueState(false);
        this.changeDetectorRef.detectChanges();
      },
      error: (err) => console.log(err),
      complete: () => {
        console.log('GET PRODUCT COMPLETE');
        subscription.unsubscribe();
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  /*==========================================================================
  *  Function to Get All The Categories                                      *
  ===========================================================================*/
  getCategory() {
    console.log('Inside async');
    let counter = 0;
    let link = BASE_API_URL + '/categories';
    console.log('LINK: ' + link);
    this.categoryList = [];
    let subscription = this.httpClient.get(link).subscribe({
      next: (response: any) => {
        this.categoryList = response;
        this.util.setCatalogueState(true);
      },
      error: (err) => console.log(err),
      complete: () => {
        console.log(
          'GET CATEGORY COMPLETE',
          this.displayCategoryList,
          this.displayProductList
        );
      },
    });
  }

  /*==========================================================================
  *  Function to Get All The Products for a Category based on the PageNumber *
  ===========================================================================*/
  getNextPage(page: any) {
    this.page = page; //set current page to the page number clicked
    this.getProductList(this.currentCategoryObject);
  }

  getKey(item: Object) {
    return Object.keys(item)[0];
  }

  getId(item: any) {
    let key: any = Object.keys(item)[0];
    return item[key];
  }
}
