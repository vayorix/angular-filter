// filter.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface Filter {
  id: number;
  filterName: string;
  filterType: string;
  filters: any; // The query builder config
}

@Injectable({ providedIn: 'root' })
export class FilterService {
  private filters: Filter[] = [
  
      {
          "filterName": "Primary Accounts",
          "filterType": "Basic",
          "filters": [
              {
                  "rules": [
                      {
                          "condition": "AND",
                          "entity": "Payment",
                          "field": "Payment ID",
                          "operator": "not equals",
                          "type": "ANY",
                          "value": "aaa"
                      },
                      {
                          "condition": "AND",
                          "entity": "Payment",
                          "field": "isPrimary",
                          "operator": "",
                          "type": "",
                          "value": "Yes"
                      }
                  ]
              },
              {
                  "rules": []
              }
          ],
          "id": 1
      },
      {
          "filterName": "Large Payments",
          "filterType": "Advanced",
          "filters": [
              {
                  "rules": [
                      {
                          "condition": "AND",
                          "entity": "Payment",
                          "field": "Amount",
                          "operator": "not equals",
                          "type": "ANY",
                          "value": "543"
                      },
                      {
                          "condition": "AND",
                          "entity": "Account",
                          "field": "Account Number",
                          "operator": "equals",
                          "type": "ALL",
                          "value": "222"
                      }
                  ]
              },
              {
                  "rules": []
              }
          ],
          "id": 2
      }
  
  ];
  private filters$ = new BehaviorSubject<Filter[]>(this.filters);

  getFilters(keyword: string): Observable<Filter[]> {
    if(keyword) {
    const filteredFilters = this.filters.filter(filter =>
      filter.filterName.toLowerCase().includes(keyword.toLowerCase()) ||
      filter.filterType.toLowerCase().includes(keyword.toLowerCase())
    );
    return of(filteredFilters);
  } else {
    return of(this.filters);
  }
  }

  getFilterById(id: number): Observable<Filter | undefined> {
    return of(this.filters.find(f => f.id == id));
  }

  addFilter(filter: Filter) {
    filter.id = Date.now(); // generate unique ID
    //filter.id = this.filters.length ? Math.max(...this.filters.map(f => f.id)) + 1 : 1;
    this.filters.push(filter);
    this.filters$.next(this.filters);
  }

  updateFilter(id: number, updated: Filter) {
    const idx = this.filters.findIndex(f => f.id === id);
    if (idx !== -1) {
      this.filters[idx] = { ...updated, id };
      this.filters$.next(this.filters);
    }
  }

  deleteFilter(id: number) {
    this.filters = this.filters.filter(f => f.id !== id);
    this.filters$.next(this.filters);
  }
}
