import { Component, OnInit, Input, OnChanges, ElementRef } from '@angular/core';
import { PageHeaderComponent } from '@shared';
import { CustomUser, Task } from '@shared/interfaces/interfaces';
import { AssignationsService } from '@shared/services/assignations.service';
import * as d3 from 'd3';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-backlog-backlog-gantt',
  templateUrl: './backlog-gantt.component.html',
  styleUrl: './backlog-gantt.component.scss',
  standalone: true,
  imports: [PageHeaderComponent],
})
export class BacklogBacklogGanttComponent implements OnInit {
  tasks: Task[] = [];
  users: CustomUser[] = [];
  width = 800;
  height = 400;
  loading = false;

  constructor(
    private el: ElementRef,
    private assignationsService: AssignationsService
  ) {}

  ngOnInit(): void {
    this.assignationsService.getAllTasks('', false, ['pending', 'blocked', 'active']).subscribe({
      next: res => {
        this.tasks = res;
      },
      error: err => {},
      complete: () => {
        this.loading = false;
        this.renderChart();
      },
    });
    forkJoin({
      myTasks: this.assignationsService.getAllTasks('', false, ['pending', 'blocked', 'active']),
      users: this.assignationsService.getAllMembers(),
    }).subscribe({
      next: ({ myTasks, users }) => {
        this.tasks = myTasks;
        this.users = users;
      },
      error: e => {},
      complete: () => (this.loading = false),
    });
  }

  ngOnChanges(): void {
    this.renderChart();
  }

  renderChart(): void {
    const element = this.el.nativeElement;
    const svgWidth = this.width;
    const svgHeight = this.height;

    // Clear previous chart
    d3.select(element).select('svg').remove();

    // Create SVG canvas
    const svg = d3
      .select(element)
      .select('#ganttChart')
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    // Set margins
    const margin = { top: 20, right: 20, bottom: 20, left: 50 };
    const innerWidth = svgWidth - margin.left - margin.right;
    const innerHeight = svgHeight - margin.top - margin.bottom;

    const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Parse dates
    const parseDate = d3.timeParse('%Y-%m-%dT%H:%M:%S.%fZ');
    const tasks = this.tasks
      .filter((task: Task) => task.estimatedPickedAt && task.estimatedFinalization)
      .map(task => ({
        ...task,
        estimatedPickedAt: parseDate(task.estimatedPickedAt!),
        estimatedFinalization: parseDate(task.estimatedFinalization!),
      }));

    // Set up scales
    const xDomain = d3.extent(tasks, (d: any) => d.estimatedPickedAt) as [Date, Date];
    if (!xDomain[0] || !xDomain[1]) {
      console.error('Invalid date range in tasks');
      return; // Or handle appropriately (e.g., use a default range)
    }

    const xScale = d3
      .scaleTime()
      .domain([xDomain[0], xDomain[1]] as [Date, Date])
      .range([0, innerWidth]);

    const users = Array.from(new Set(this.users.map(user => user.name)));
    const yScale = d3.scaleBand().domain(users).range([0, innerHeight]).padding(0.1);

    // Add X Axis
    g.append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale).ticks(5));

    // Add Y Axis
    g.append('g').call(d3.axisLeft(yScale));

    // Add rectangles for tasks
    g.selectAll('rect')
      .data(tasks)
      .enter()
      .append('rect')
      .attr('x', (d: any) => xScale(d.estimatedPickedAt) as number)
      .attr('y', (d: any) => yScale(d.reservedForUser.name) as number)
      .attr(
        'width',
        (d: any) =>
          (xScale(d.estimatedFinalization) as number) - (xScale(d.estimatedPickedAt) as number)
      )
      .attr('height', yScale.bandwidth())
      .attr('fill', '#69b3a2');
  }
}
