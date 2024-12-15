import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTable, MatTableModule } from '@angular/material/table';
import { PageHeaderComponent } from '@shared';
import { StatusModalComponent } from '@shared/components/status-modal/status-modal.component';
import { Category, Status } from '@shared/interfaces/interfaces';
import { AssignationsService } from '@shared/services/assignations.service';

@Component({
  selector: 'app-configuration-status',
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
  standalone: true,
  imports: [
    PageHeaderComponent,
    PageHeaderComponent,
    CommonModule,
    MatTableModule,
    MatIcon,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigurationStatusComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<Category[]>;
  statuses: Status[] = [];

  constructor(
    private assignationsService: AssignationsService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.assignationsService.getAllStatus().subscribe({
      next: res => {
        this.statuses = res;
        this.cdr.markForCheck();
        this.table.renderRows();
      },
      error: e => console.error(e),
      complete: () => console.info('complete'),
    });
  }

  openCreateStatusModal(): void {
    const dialogRef = this.dialog.open(StatusModalComponent, {
      data: null,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

      if (!result) {
        return;
      }

      this.statuses.push(result);
      this.cdr.markForCheck();
      this.table.renderRows();
    });
  }

  editStatusModal(status: Status): void {
    const dialogRef = this.dialog.open(StatusModalComponent, {
      data: status,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

      const index = this.statuses.findIndex(status => status.id === result.id);
      if (index !== -1) {
        this.statuses[index] = result;
      }

      this.cdr.markForCheck();
      this.table.renderRows();
    });
  }
}
