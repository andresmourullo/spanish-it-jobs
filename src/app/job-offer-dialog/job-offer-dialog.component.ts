import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-job-offer-dialog',
  templateUrl: './job-offer-dialog.component.html',
  styleUrls: ['./job-offer-dialog.component.scss']
})
export class JobOfferDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<JobOfferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
