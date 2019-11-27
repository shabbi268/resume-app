import { Component, OnInit } from '@angular/core';
import { SelectionService, EditService } from '@syncfusion/ej2-angular-grids';
import { User } from './user';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SelectionService, EditService]
})
export class AppComponent implements OnInit {

  public ngOnInit() {
  }
}
