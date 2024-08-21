import { Routes } from '@angular/router';
import { MapComponent } from './map/map.component';

export const routes: Routes = [
  { path: '', component: MapComponent },  // Ruta raíz que carga el MapComponent
  { path: '**', redirectTo: '', pathMatch: 'full' }  // Redirige cualquier ruta no encontrada a la raíz
];
