import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PageHeaderComponent } from '@shared';
import { MatButtonModule } from '@angular/material/button';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { AssignationsService } from '@shared/services/assignations.service';
import { Task } from '@shared/interfaces/interfaces';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { TaskModalComponent } from '@shared/components/task-modal/task-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-backlog-backlog-table',
  templateUrl: './backlog-table.component.html',
  styleUrl: './backlog-table.component.scss',
  standalone: true,
  imports: [
    PageHeaderComponent,
    CdkDropList,
    CdkDrag,
    MatTableModule,
    MatIcon,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BacklogBacklogTableComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<Task[]>;

  tasks: Task[] = [];

  constructor(
    private assignationsService: AssignationsService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.assignationsService.getAllTasks().subscribe(
      res => {
        this.tasks = Array(20)
          .fill(res[0])
          .map((task, index) => ({ ...task, title: `Task ${index + 1}` }));
        this.cdr.markForCheck();
        this.table.renderRows();

        this.openCreateTaskModal(); // TODO: remove
      },
      err => console.log(err) // TODO: handle error
    );
  }

  drop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    this.table.renderRows();
  }

  openCreateTaskModal(): void {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      data: null,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  editTaskModal(task: Task): void {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      data: task,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
