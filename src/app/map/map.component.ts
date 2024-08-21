import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as L from 'leaflet';
import { JobOfferDialogComponent } from '../job-offer-dialog/job-offer-dialog.component';

// Declarar las variables globales
declare var spainGeoJSON: any;
declare var provincesMapping: any;
declare var offersData: any;

interface CombinedData {
  total_offers: number;
  technologies: { [key: string]: number };
  companies: { [key: string]: number };
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  techList: {[key: string]: number;} = {};
  companiesList: {[key: string]: number;} = {};
  regionName: string = '';
  totalOffers: number = 0;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    const map = L.map('map', {
      center: [40.416775, -3.703790],
      zoom: 5,
      minZoom: 5,
      maxZoom: 5,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      dragging: false
    });
  
    L.geoJSON(spainGeoJSON, {
      style: (feature) => {
        return {
          color: '#3388ff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.5
        };
      },
      onEachFeature: (feature, layer) => {
        const communityName = feature.properties.name;
        const province = this.findProvincesByCommunityName(communityName);
  
        let styleOptions: L.PathOptions = {
          color: '#3388ff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.5,
        };
  
        if (province === 'Canarias') {
          const className = 'canary-islands';
          (layer as any).options.className = className;
        }
  
        if (layer instanceof L.Path) {
          layer.setStyle(styleOptions);
        }
  
        layer.on('click', (event: L.LeafletMouseEvent) => {
          const province = this.findProvincesByCommunityName(communityName);
  
          let combinedData: CombinedData = {
            total_offers: 0,
            technologies: {},
            companies: {}
          };
  
          if (offersData[province]) {
            const provinceData = offersData[province];
            combinedData.total_offers += provinceData.total_offers;
  
            for (const [tech, count] of Object.entries(provinceData.technologies)) {
              const countNumber = count as number;
              combinedData.technologies[tech] = (combinedData.technologies[tech] || 0) + countNumber;
            }
  
            for (const [company, count] of Object.entries(provinceData.companies)) {
              const countNumber = count as number;
              combinedData.companies[company] = (combinedData.companies[company] || 0) + countNumber;
            }
          }
  
          this.setRegionData(communityName, combinedData);
  
          // Convertir latlng a píxeles
          const point = map.latLngToContainerPoint(event.latlng);
          this.openDialog({ clientX: point.x, clientY: point.y } as MouseEvent);
        });
      }
    }).addTo(map);
  }

  findProvincesByCommunityName(communityName: string): string {
    for (const [provinces, communities] of Object.entries(provincesMapping)) {
      if (Array.isArray(communities)) {  // Verificar que communities es un array
        for (const community of communities) {
          if (community === communityName) {
            return provinces;
          }
        }
      }
    }
    return '';
  }

  setRegionData(regionName: string, regionData: CombinedData): void {
    const { total_offers, technologies, companies } = regionData;

    this.techList = technologies;
    this.companiesList = companies;
    this.regionName = regionName;
    this.totalOffers = total_offers;
  }

  openDialog(event: { clientX: number; clientY: number }): void {
    const dialogRef = this.dialog.open(JobOfferDialogComponent, {
      data: {
        regionName: this.regionName,
        totalOffers: this.totalOffers,
        companies: this.companiesList,
        technologies: this.techList
      },
      // position: { left: `${event.clientX}px`, top: `${event.clientY}px` },
      panelClass: 'custom-dialog-container',
      maxHeight: '90vh',
      maxWidth: '550px',
      height: '90vh',
      width: '550px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
    });
  }
}
