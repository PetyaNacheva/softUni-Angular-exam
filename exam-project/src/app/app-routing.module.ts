import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./core/guards/auth.guard";

import { AboutComponent } from "./feature/pages/about/about.component";
import { HomePageComponent } from "./feature/pages/home-page/home-page.component";
import { PageNotFoundPageComponent } from "./feature/pages/page-not-found-page/page-not-found-page.component";


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
        path: 'movies',
        canActivate: [AuthGuard],
        loadChildren: () => import('./feature/movies/movies.module').then(m => m.MoviesModule)
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