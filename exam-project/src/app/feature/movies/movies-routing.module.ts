import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { MoviesDetailPageComponent } from "./movies-detail-page/movies-detail-page.component";
import { MoviesNewPageComponent } from "./movies-new-page/movies-new-page.component";
import { MoviesPageComponent } from "./movies-page/movies-page.component";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: MoviesPageComponent,
    },
    {
        path: 'new',
        canActivate: [AuthGuard],
        component: MoviesNewPageComponent,
    },
    {
        path: ':moviesId',
        component: MoviesDetailPageComponent,
    }
]

export const MoviesRoutingModule = RouterModule.forChild(routes);