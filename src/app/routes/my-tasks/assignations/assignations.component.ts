import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PageHeaderComponent } from '@shared';
import { SingleTaskCardComponent } from '@shared/components/single-task-card/single-task-card.component';

@Component({
  selector: 'app-my-tasks-assignations',
  templateUrl: './assignations.component.html',
  styleUrl: './assignations.component.scss',
  standalone: true,
  imports: [PageHeaderComponent, SingleTaskCardComponent, MatButtonModule],
})
export class MyTasksAssignationsComponent implements OnInit {
  constructor() {}

  myTasks = [
    {
      id: 'f71451ed-e5e6-436c-8acd-904e4a6c16f3',
      status: {
        id: '93788f5e-ac6d-4d03-8352-87468fa2413b',
        status: 'On Hold',
        activeState: true,
      },
      project: {
        id: '01e763c4-9fda-4e2a-9295-24fafdef64d8',
        name: 'Project1',
        description: 'Project 1 description',
      },
      assignedUser: null,
      category: null,
      title: 'Task test 1',
      description: 'Test description',
      pickedAt: null,
      estimatedDuration: '5 00:00:00',
      expectedFinalization: null,
      estimatedFinalization: null,
      dependencies: [],
    },
    {
      id: 'f71451ed-e5e6-436c-8acd-904e4a6c16f4',
      status: {
        id: '93788f5e-ac6d-4d03-8352-87468fa2413b',
        status: 'In Progress',
        activeState: true,
      },
      project: {
        id: '01e763c4-9fda-4e2a-9295-24fafdef64d8',
        name: 'Project1',
        description: 'Project 1 description',
      },
      assignedUser: null,
      category: null,
      title: 'Task test 2',
      description: 'Test description',
      pickedAt: null,
      estimatedDuration: '5 00:00:00',
      expectedFinalization: null,
      estimatedFinalization: null,
      dependencies: [],
    },
  ];

  ngOnInit() {}

  pickNextTask() {}
}
