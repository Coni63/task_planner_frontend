import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-backlog-backlog-table',
  templateUrl: './backlog-table.component.html',
  styleUrl: './backlog-table.component.scss',
  standalone: true,
  imports: [PageHeaderComponent]
})
export class BacklogBacklogTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
