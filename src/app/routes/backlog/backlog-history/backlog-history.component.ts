import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-backlog-backlog-history',
  templateUrl: './backlog-history.component.html',
  styleUrl: './backlog-history.component.scss',
  standalone: true,
  imports: [PageHeaderComponent]
})
export class BacklogBacklogHistoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
