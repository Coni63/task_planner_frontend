import { Component, OnInit, ViewChild } from '@angular/core';
import { PageHeaderComponent } from '@shared';

import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { AssignationsService } from '@shared/services/assignations.service';
import { Task } from '@shared/interfaces/interfaces';
import { MatTable, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-backlog-backlog-table',
  templateUrl: './backlog-table.component.html',
  styleUrl: './backlog-table.component.scss',
  standalone: true,
  imports: [PageHeaderComponent, CdkDropList, CdkDrag, MatTableModule],
})
export class BacklogBacklogTableComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<Task[]>;

  tasks: Task[] = [];

  constructor(private assignationsService: AssignationsService) {}

  ngOnInit() {
    this.assignationsService.getAllTasks().subscribe(
      res => {
        this.tasks = Array(20)
          .fill(res[0])
          .map((task, index) => ({ ...task, title: `Task ${index + 1}` }));
      },
      err => console.log(err) // TODO: handle error
    );
  }

  drop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    this.table.renderRows();
  }
}
