import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SpotsResolver } from './utils/spots-resolver';
import { FavouritesResolver } from './utils/favourites-resolver';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard',
        component: DashboardComponent,

        //Get the spots data first before routing to dashboard
        resolve: {
          allSpots: SpotsResolver,
          favSpots: FavouritesResolver
        }
      },
      {path:'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
