import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Task } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-single-task-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './single-task-card.component.html',
  styleUrl: './single-task-card.component.scss',
})
export class SingleTaskCardComponent {
  @Input() task!: Task;
}
