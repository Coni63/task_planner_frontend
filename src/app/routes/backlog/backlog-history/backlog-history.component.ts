import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PageHeaderComponent } from '@shared';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Task } from '@shared/interfaces/interfaces';
import $ from 'jquery';
import { AssignationsService } from '@shared/services/assignations.service';

// https://l-lin.github.io/angular-datatables/#/advanced/individual-column-filtering
// https://datatables.net/

@Component({
  selector: 'app-backlog-backlog-history',
  templateUrl: './backlog-history.component.html',
  styleUrl: './backlog-history.component.scss',
  standalone: true,
  imports: [PageHeaderComponent, DataTablesModule],
})
export class BacklogBacklogHistoryComponent implements OnInit {
  constructor(private assignationsService: AssignationsService) {}

  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  dtOptions: Config = {};

  ngOnInit(): void {
    const that = this;
    this.dtOptions = {
      serverSide: true,
      lengthChange: false,
      searching: true,
      orderMulti: true,
      processing: true,
      pageLength: 15,
      // dom: 'lrtip',
      layout: {
        topStart: null,
        topEnd: null,
        bottomStart: 'info',
        bottomEnd: 'paging',
      },

      ajax: (dataTablesParameters: any, callback) => {
        that.assignationsService.getHistory(dataTablesParameters).subscribe(response => {
          callback({
            recordsTotal: response.total,
            recordsFiltered: response.filtered,
            data: response.items,
          });
        });
      },
      columns: [
        {
          title: 'Reference',
          data: 'reference',
        },
        {
          title: 'pickedAt',
          data: 'pickedAt',
        },
        {
          title: 'estimatedDuration',
          data: 'estimatedDuration',
        },
        {
          title: 'estimatedFinalization',
          data: 'estimatedFinalization',
        },
        {
          title: 'project',
          data: 'project.name',
        },
        {
          title: 'pickedBy',
          data: 'pickedBy.name',
        },
      ],
    };
  }

  ngAfterViewInit(): void {
    this.datatableElement.dtInstance.then(dtInstance => {
      dtInstance.columns().every(function () {
        const that = this;
        $('input', this.footer()).on('keyup change', function () {
          clearTimeout($.data(this, 'timer'));

          var waitTime = 500; // 500ms debounce time
          var self = this;

          var timer = setTimeout(function () {
            let inputValue = $(self).val()?.toString();
            inputValue = inputValue ? inputValue : '';
            if (that.search() !== inputValue) {
              that.search(inputValue).draw();
            }
          }, waitTime);

          $.data(this, 'timer', timer);
        });
      });
    });
  }
}
