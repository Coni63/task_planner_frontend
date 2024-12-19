import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PageHeaderComponent } from '@shared';
import { SingleTaskCardComponent } from '@shared/components/single-task-card/single-task-card.component';
import { AssignationsService } from '../../../shared/services/assignations.service';
import { Status, Task } from '@shared/interfaces/interfaces';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { ErrorCodeComponent } from '../../../shared/components/error-code/error-code.component';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

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
  status: Status[] = [];
  loading = true;

  ngOnInit() {
    this.loading = true;

    forkJoin({
      myTasks: this.assignationsService.getMyAssignations(),
      status: this.assignationsService.getAllStatus(),
    }).subscribe({
      next: ({ myTasks, status }) => {
        this.myTasks = myTasks;
        this.status = status;
      },
      error: e => console.error(e),
      complete: () => (this.loading = false),
    });
  }

  pickNextTask() {
    this.assignationsService.pickNextTask().subscribe({
      next: res => {
        this.myTasks.push(res);
      },
      error: err => console.log(err),
      complete: () => {},
    });
  }

  hasActiveTasks() {
    if (!this.myTasks || this.myTasks.length === 0) return false;

    return this.myTasks.filter(task => task.status.state === 'active').length > 0;
  }

  holdTask(task: Task) {
    let closed_id = this.status.find(status => status.status === 'On Hold')?.id;
    let subset = {
      id: task.id,
      status: closed_id,
    };
    this.assignationsService.patchTask(task.id, subset).subscribe({
      next: res => console.log(res),
      error: err => console.log(err),
      complete: () => {},
    });
  }

  closeTask(task: Task) {
    let closed_id = this.status.find(status => status.status === 'Done')?.id;
    let subset = {
      id: task.id,
      status: closed_id,
    };
    this.assignationsService.patchTask(task.id, subset).subscribe({
      next: res => console.log(res),
      error: err => console.log(err),
      complete: () => {},
    });
  }
}
