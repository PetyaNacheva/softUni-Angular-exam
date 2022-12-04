import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { BazarItemDetailsComponent } from "./bazar-item-details/bazar-item-details.component";



const routes: Routes = [

    {
        path: 'offers/:offerId',
        canActivate: [AuthGuard],
        component: BazarItemDetailsComponent,
    },

];

export const BazarRoutingModule = RouterModule.forChild(routes);