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
import { LoadingComponent } from '@shared/components/loading/loading.component';

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
    LoadingComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BacklogBacklogTableComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<Task[]>;

  loading = true;
  tasks: Task[] = [];

  constructor(
    private assignationsService: AssignationsService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loading = true;
    this.assignationsService.getAllTasks().subscribe({
      next: res => {
        this.tasks = res;
        this.loading = false;
        this.cdr.markForCheck();
        this.table.renderRows();

        // this.openCreateTaskModal(); // TODO: remove
      },
      error: err => console.log(err),
      complete: () => {
        console.info('complete');
      },
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);

    this.tasks.forEach((task, index) => (task.order = index));
    this.assignationsService.reorderTasks(this.tasks).subscribe();

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
