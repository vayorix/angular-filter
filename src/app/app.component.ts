import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FilterService } from './filter.service';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  rowData: any[] = [];
  columnDefs = [
    { headerName: 'Filter Name', field: 'filterName', sortable: true, filter: true, flex: 1 },
    { headerName: 'Filter Type', field: 'filterType', sortable: true, filter: true, flex: 1 },
    {
      headerName: 'Actions',
      cellRenderer: (params: any) => {
        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.classList.add('btn', 'btn-primary', 'btn-sm', 'mr-2');
        editButton.addEventListener('click', () => this.edit(params.data));

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.addEventListener('click', () => this.deleteFilter(params.data.id));

        const container = document.createElement('div');
        container.appendChild(editButton);
        container.appendChild(deleteButton);

        return container;
      },
      flex: 1,
    },
  ];

  editingIndex: number | null = null;
  filterName: any;
  filterType: any;
  filters = [
    {
      rules: [
        {
          condition: 'AND',
          entity: '',
          field: '',
          operator: '',
          type: '',
          value: ''
        }
      ]
    }
  ];

  entities = [
    { name: 'Account', fields: ['Account Name', 'Account Number', 'isPrimary'] },
    { name: 'Payment', fields: ['Payment ID', 'Amount', 'isPrimary'] }
  ];

  operators = ['equals', 'not equals', 'contains', 'not contains', 'starts with', 'ends with'];

  submitted = false;

  constructor(private ch: ChangeDetectorRef, private filterService: FilterService) {}

  ngOnInit(): void {
    this.getFilterData();
  }

  getFilterData() {
    this.filterService.getFilters("").subscribe((data: any) => {
      console.log({ data });
      this.rowData = [...data];
      if (this.agGrid?.api) {
        this.agGrid.api.redrawRows();
      }
      this.ch.detectChanges();
    });
  }

  addGroup() {
    this.filters.push({ rules: [] });
  }

  removeGroup(index: number) {
    this.filters.splice(index, 1);
  }

  addRule(groupIndex: number) {
    this.filters[groupIndex].rules.push({
      condition: 'AND',
      entity: '',
      field: '',
      operator: '',
      type: '',
      value: ''
    });
  }

  removeRule(groupIndex: number, ruleIndex: number) {
    this.filters[groupIndex].rules.splice(ruleIndex, 1);
  }

  getFields(entityName: string): string[] {
    const entity = this.entities.find(e => e.name === entityName);
    return entity ? entity.fields : [];
  }

  onEntityChange(rule: any) {
    rule.field = '';
    rule.operator = '';
    rule.type = '';
    rule.value = '';
  }

  getFieldType(field: string): 'text' | 'dropdown' | 'date' {
    if (!field) return 'text';
    const dropdownFields = ['isPrimary'];
    const dateFields = ['createdAt', 'updatedAt'];
    if (dropdownFields.includes(field)) return 'dropdown';
    if (dateFields.includes(field)) return 'date';
    return 'text';
  }

  getDropdownOptions(field: string): string[] {
    const dropdownOptions: { [key: string]: string[] } = {
      isPrimary: ['Yes', 'No']
    };
    return dropdownOptions[field] || [];
  }

  submitFilters() {
    const filterData = {
      filterName: this.filterName,
      filterType: this.filterType,
      filters: this.filters,
      id: this.editingIndex !== null ? this.editingIndex : Date.now() // Generate unique ID for new filters
    };

    if (this.editingIndex !== null) {
      this.filterService.updateFilter(this.editingIndex, filterData)
        this.getFilterData();
     
    } else {
      this.filterService.addFilter(filterData);
        this.getFilterData();
    }

    this.resetForm();
  }

  edit(filter: any) {
    console.log("Edit called,=>",filter);
    this.editingIndex = filter.id;
    this.filterName = filter.filterName;
    this.filterType = filter.filterType;
    this.filters = filter.filters;
    this.ch.detach();
  }

  deleteFilter(id: number) {
    this.filterService.deleteFilter(id)
      this.getFilterData();
  }

  resetForm() {
    this.editingIndex = null;
    this.filterName = '';
    this.filterType = '';
    this.filters = [
      {
        rules: [
          {
            condition: 'AND',
            entity: '',
            field: '',
            operator: '',
            type: '',
            value: ''
          }
        ]
      }
    ];
    this.submitted = false;
  }

  shouldShowConditionAndType(field: string): boolean {
    return field !== 'isPrimary';
  }
}
