import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-backlog-backlog-gantt',
  templateUrl: './backlog-gantt.component.html',
  styleUrl: './backlog-gantt.component.scss',
  standalone: true,
  imports: [PageHeaderComponent]
})
export class BacklogBacklogGanttComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
