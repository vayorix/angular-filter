// Final Merged Angular CRUD for Query Builder Without Child Component

// filter-list.component.ts
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { FilterService } from '../../filter.service';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls:['./filter-list.component.scss']
})
export class FilterListComponent implements OnInit {
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  rowData: any[] = [];
  filteredData: any[] = [];
  columnDefs = [
    { headerName: 'Filter Name', field: 'filterName', sortable: true, filter: true, flex: 1 },
    { headerName: 'Filter Type', field: 'filterType', sortable: true, filter: true, flex: 1 },
        {
      headerName: 'Actions',
      cellRenderer: (params: any) => {
        // Create the edit button with an icon
        const editButton = document.createElement('span');
        editButton.innerHTML = '<i class="fa fa-edit"></i>'; // FontAwesome edit icon
        editButton.classList.add('btn', 'btn-icon', 'btn-primary', 'btn-sm', 'mr-2');
        editButton.title = 'Edit';
        editButton.style.cssText = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
`;
        editButton.addEventListener('click', () => this.edit(params.data));
    
        // Create the delete button with an icon
        const deleteButton = document.createElement('span');
        deleteButton.innerHTML = '<i class="fa fa-trash"></i>'; // FontAwesome delete icon
        deleteButton.classList.add('btn', 'btn-icon', 'btn-danger', 'btn-sm');
        deleteButton.title = 'Delete';
        deleteButton.style.cssText = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #dc3545;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  margin-left: 8px;
`;
        deleteButton.addEventListener('click', () => this.deleteFilter(params.data.id));
    
        // Create a container for the buttons
        const container = document.createElement('div');
        container.appendChild(editButton);
        container.appendChild(deleteButton);
    
        return container;
      },
      flex: 1,
    }
  ];

  availableFilters: string[] = ['Filter Name', 'Filter Type']; // Example filters
  selectedFilter: string = '';
  searchText: string = '';

  constructor(private ch: ChangeDetectorRef, private filterService: FilterService, private router: Router) {}

  ngOnInit(): void {
    this.getFilterData();
  }

  getFilterData() {
    this.filterService.getFilters(this.searchText).subscribe((data: any) => {
      console.log({ data });
      this.rowData = [...data];
      this.filteredData = [...data]; // Initialize filteredData
      if (this.agGrid?.api) {
        this.agGrid.api.redrawRows();
      }
      this.ch.detectChanges();
    });
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchText = input.value.toLowerCase();
    // this.applyFilter();
  }

  onFilterChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedFilter = select.value;
  }

  applyFilter() {
    // if (!this.selectedFilter && !this.searchText) {
    //   this.filteredData = [...this.rowData]; // Reset to original data
    // } else {
      this.getFilterData();
      // this.filteredData = this.rowData.filter((item) => {
      //   const fieldValue = item[this.selectedFilter]?.toString().toLowerCase() || '';
      //   return fieldValue.includes(this.searchText);
      // });
    // }
    // this.rowData = [...this.filteredData]

    // if (this.agGrid?.api) {
    //   //this.agGrid.api.(this.filteredData);
    // }
  }

  edit(filter: any) {
    this.router.navigate(["filters/edit/" + filter.id]);
    console.log("Edit called,=>", filter);
    this.ch.detach();
  }

  deleteFilter(id: number) {
    this.filterService.deleteFilter(id);
    this.getFilterData();
  }

  addNew() {
    this.router.navigate(["/filters/new"]);
  }
}
