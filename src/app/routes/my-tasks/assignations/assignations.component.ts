import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PageHeaderComponent } from '@shared';
import { SingleTaskCardComponent } from '@shared/components/single-task-card/single-task-card.component';
import { AssignationsService } from './assignations.service';
import { Task } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-my-tasks-assignations',
  templateUrl: './assignations.component.html',
  styleUrl: './assignations.component.scss',
  standalone: true,
  imports: [PageHeaderComponent, SingleTaskCardComponent, MatButtonModule],
})
export class MyTasksAssignationsComponent implements OnInit {
  constructor(private assignationsService: AssignationsService) {}

  myTasks: Task[] = [];

  ngOnInit() {
    this.fetchTasks();
  }

  pickNextTask() {}

  fetchTasks() {
    this.assignationsService.getMyAssignations().subscribe(
      res => {
        this.myTasks = res;
      },
      err => console.log(err)
    );
  }
}
