import { Routes } from '@angular/router';
import { BacklogBacklogTableComponent } from './backlog-table/backlog-table.component';
import { BacklogBacklogGanttComponent } from './backlog-gantt/backlog-gantt.component';
import { BacklogBacklogHistoryComponent } from './backlog-history/backlog-history.component';
import { BacklogBacklogMetricsComponent } from './backlog-metrics/backlog-metrics.component';

export const routes: Routes = [{ path: 'backlog-table', component: BacklogBacklogTableComponent },
{ path: 'backlog-gantt', component: BacklogBacklogGanttComponent },
{ path: 'backlog-history', component: BacklogBacklogHistoryComponent },
{ path: 'backlog-metrics', component: BacklogBacklogMetricsComponent }
];
