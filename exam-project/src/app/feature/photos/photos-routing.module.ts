import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { PhotosDetailPageComponent } from "./photos-detail-page/photos-detail-page.component";
import { PhotosNewPageComponent } from "./photos-new-page/photos-new-page.component";
import { PhotosPageComponent } from "./photos-page/photos-page.component";
import { PhotosTopPageComponent } from "./photos-top-page/photos-top-page.component";


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: PhotosPageComponent,
    },
    {
        path: 'new',
        canActivate: [AuthGuard],
        component: PhotosNewPageComponent,
    },
    {
        path: ':photoId',
        canActivate: [AuthGuard],
        component: PhotosDetailPageComponent,
    },

];

export const PhotosRoutingModule = RouterModule.forChild(routes);