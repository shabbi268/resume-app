import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-managerform',
  templateUrl: './managerform.component.html',
  styleUrls: ['./managerform.component.css']
})

export class ManagerComponent implements OnInit {
  newcomponent = 'Entered in new component created';
   constructor() {}
   ngOnInit() { }
}



