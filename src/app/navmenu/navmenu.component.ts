import { ChangeDetectorRef } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryComponent } from '../category/category.component';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css'],
})
export class NavmenuComponent implements OnInit {
  navList: Array<string> = ['Home', 'Catalogue'];
  navLink: any = {
    Home: 'http://localhost:4200/Home',
    SignUp: 'http://localhost:4200/Catalogue',
  };

  navTrack: number = 0;

  constructor(
    private router: Router,
    private util: UtilityService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  navHandler(item: any, event: any) {
    console.log('CLICKED ', item);
    console.log('INSIDE HANDLER', item);
    switch (item) {
      case 'Home':
        this.router.navigate(['/home']);
        break;
      case 'Catalogue':
        this.util.setCatalogueState(true);
        //category component subscribes to this and displays categories or products accordingly
        this.router.navigate(['catalogue']);
        break;
      default:
        this.router.navigate(['home']);
        break;
    }
  }
}
