import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ITaskModelResponse } from '../../../../../../core/interfaces/task/ITaskModelResponse';

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.scss'
})
export class DeleteTaskComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public dataUser: ITaskModelResponse,
  ) { }

  protected closeModal(){

    this.dialogRef.close(false);
  }

  protected deleteTask(){

    this.dialogRef.close(true);
  }
}
