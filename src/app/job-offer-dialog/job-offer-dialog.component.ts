import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-job-offer-dialog',
  templateUrl: './job-offer-dialog.component.html',
  styleUrls: ['./job-offer-dialog.component.scss']
})
export class JobOfferDialogComponent implements OnInit {

  public technologiesData: any[] = [];
  public companiesData: any[] = [];

  public showLegend: boolean = true;
  public showLabels: boolean = true;
  public doughnutChartOptions: any = {
    view: [500, 200],
    colorScheme: 'cool'
  };

  public barChartOptions: any = {
    view: [500, 200],
    colorScheme: 'vivid',
    showXAxis: true,
    showYAxis: true,
    showXAxisLabel: true,
    xAxisLabel: 'Empresas',
    showYAxisLabel: true,
    yAxisLabel: 'Ofertas'
  };

  constructor(
    public dialogRef: MatDialogRef<JobOfferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data);

    // Preparar datos para el gráfico de tecnologías
    this.technologiesData = Object.entries(this.data.technologies)
      .map(([name, value]) => ({ name, value }));

    // Preparar datos para el gráfico de empresas
    this.companiesData = Object.entries(this.data.companies)
      .map(([name, value]) => ({ name, value }));
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
