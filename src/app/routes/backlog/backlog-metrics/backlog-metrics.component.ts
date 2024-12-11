import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-backlog-backlog-metrics',
  templateUrl: './backlog-metrics.component.html',
  styleUrl: './backlog-metrics.component.scss',
  standalone: true,
  imports: [PageHeaderComponent]
})
export class BacklogBacklogMetricsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
