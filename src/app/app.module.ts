import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { NavmenuComponent } from './navmenu/navmenu.component';

@NgModule({
  declarations: [AppComponent, CategoryComponent, NavmenuComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [CategoryComponent, HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
