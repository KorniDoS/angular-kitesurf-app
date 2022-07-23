import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SpotComponent } from './components/spot/spot.component';
import { HttpClientModule } from '@angular/common/http';
import { AddSpotComponent } from './components/add-spot/add-spot.component';
import { SpotTableComponent } from './components/spot-table/spot-table.component';
import { SortDirective } from './directive/sort.directive';
import { SearchPipe } from './pipes/search.pipe';
import { MapComponent } from './components/map/map.component';
import { SignupComponent } from './components/signup/signup.component';
import { EncryptionDecriptionService } from './services/encryption-decription.service';
import { FilterComponent } from './components/filter/filter.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    SpotComponent,
    AddSpotComponent,
    SpotTableComponent,
    SortDirective,
    SearchPipe,
    MapComponent,
    SignupComponent,
    FilterComponent
  ],
  entryComponents:[
    SpotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [EncryptionDecriptionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
