import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FilterService {
  private filters: any[] = [{
    "filterName": "Test",
    "filterType": "Test1 ",
    "filters": [
        {
            "rules": [
                {
                    "condition": "AND",
                    "entity": "",
                    "field": "",
                    "operator": "",
                    "type": "",
                    "value": ""
                }
            ]
        }
    ]
}];

  getFilters() {
    return [...this.filters];
  }

  getFilterById(index: number) {
    return this.filters[index];
  }

  addFilter(filter: any) {
    this.filters.push(filter);
  }

  updateFilter(index: number, filter: any) {
    this.filters[index] = filter;
  }

  deleteFilter(index: number) {
    this.filters.splice(index, 1);
  }
}