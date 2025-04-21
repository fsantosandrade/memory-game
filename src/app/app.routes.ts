import { Routes } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { ResultPageComponent } from './pages/result-page/result-page.component';

export const routes: Routes = [
    { path: "menu", component: MenuComponent, pathMatch: "full" },
    { path: "game", component: GamePageComponent, pathMatch: "full" },
    { path: "result", component: ResultPageComponent, pathMatch: "full" },
    { path: '**', redirectTo: "menu" }
];
