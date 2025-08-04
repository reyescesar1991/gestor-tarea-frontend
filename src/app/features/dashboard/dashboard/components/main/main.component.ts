import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UpdateTaskComponent } from '../update-task/update-task.component';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  constructor(private readonly router : Router, public readonly dialog: MatDialog){}

  protected redirectAddTask(){

    this.router.navigate(['/dashboard/add-task'])
  }

  protected editTask(){

    this.dialog.open(UpdateTaskComponent, {
        height: 'auto',
        width: 'auto',
        data: {}
      });
  }

  protected deleteTask(){

    this.dialog.open(DeleteTaskComponent, {
        height: 'auto',
        width: 'auto',
        data: {}
      });
  }
}
