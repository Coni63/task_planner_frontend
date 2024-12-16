import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PageHeaderComponent } from '@shared';
import { SingleTaskCardComponent } from '@shared/components/single-task-card/single-task-card.component';
import { AssignationsService } from '../../../shared/services/assignations.service';
import { Task } from '@shared/interfaces/interfaces';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { ErrorCodeComponent } from '../../../shared/components/error-code/error-code.component';

@Component({
  selector: 'app-my-tasks-assignations',
  templateUrl: './assignations.component.html',
  styleUrl: './assignations.component.scss',
  standalone: true,
  imports: [
    PageHeaderComponent,
    SingleTaskCardComponent,
    MatButtonModule,
    LoadingComponent,
    ErrorCodeComponent,
  ],
})
export class MyTasksAssignationsComponent implements OnInit {
  constructor(private assignationsService: AssignationsService) {}

  myTasks: Task[] = [];
  loading = true;

  ngOnInit() {
    this.fetchTasks();
  }

  pickNextTask() {}

  fetchTasks() {
    this.loading = true;
    this.assignationsService.getMyAssignations().subscribe({
      next: res => {
        this.myTasks = res;
      },
      error: err => console.log(err),
      complete: () => (this.loading = false),
    });
  }
}
