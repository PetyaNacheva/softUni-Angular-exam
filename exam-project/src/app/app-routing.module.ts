import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./core/guards/auth.guard";
import { BazarItemDetailsComponent } from "./feature/bazar/bazar-item-details/bazar-item-details.component";
import { BazarNewOfferComponent } from "./feature/bazar/bazar-new-offer/bazar-new-offer.component";
import { BazarPageComponent } from "./feature/bazar/bazar-page/bazar-page.component";
import { BazarModule } from "./feature/bazar/bazar.module";
import { AboutComponent } from "./feature/pages/about/about.component";
import { HomePageComponent } from "./feature/pages/home-page/home-page.component";
import { PageNotFoundPageComponent } from "./feature/pages/page-not-found-page/page-not-found-page.component";
import { PhotosTopPageComponent } from "./feature/photos/photos-top-page/photos-top-page.component";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: HomePageComponent
    },
    {
        path: 'user',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'photos',
        canActivate: [AuthGuard],
        loadChildren: () => import('./feature/photos/photos.module').then(m => m.PhotosModule)
    },
    {
        path: 'offers',
        canActivate: [AuthGuard],
        component: BazarPageComponent
    },
    {
        path: 'add-offer',
        canActivate: [AuthGuard],
        component: BazarNewOfferComponent
    },
    {
        path: 'top-photos',
        component: PhotosTopPageComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: '**',
        component: PageNotFoundPageComponent
    }
];

export const AppRoutingModule = RouterModule.forRoot(routes);