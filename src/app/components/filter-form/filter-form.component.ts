import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { FilterService } from 'src/app/filter.service';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls:['./filter-form.component.scss']
})
export class FilterFormComponent implements OnInit {
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  editingIndex: number | null = null;
  filterName: any;
  filterType: any ="Basic";
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

  constructor(private ch: ChangeDetectorRef, private filterService: FilterService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      console.log("Route Params =>", params);
      const filterId = params['id'];
      console.log("Filter ID =>", filterId);
      if (filterId) {
      this.filterService.getFilterById(filterId).subscribe((filter: any) => {
        console.log("Filter Data =>", filter);
        this.editingIndex = filter.id;
        this.filterName = filter.filterName;
        this.filterType = filter.filterType;
        this.filters = filter.filters;
      });
      }
    });
  }

  ngOnInit(): void {

  }

  addGroup() {
    this.filters.push({ rules: [] });
    this.ch.detectChanges();
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
    console.log(this.filters);
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
    if (!this.filterName || this.filterName.trim() === '') {
      alert('Filter Name is required.');
      return;
    }

    const filterData = {
      filterName: this.filterName,
      filterType: this.filterType,
      filters: this.filters,
      id: this.editingIndex !== null ? this.editingIndex : Date.now() // Generate unique ID for new filters
    };

    if (this.editingIndex !== null) {
      this.filterService.updateFilter(this.editingIndex, filterData);
    } else {
      this.filterService.addFilter(filterData);
    }
    this.router.navigate(['/filters']);
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
  onCancel() {
    this.resetForm();
    this.router.navigate(['/filters']);
  }
}