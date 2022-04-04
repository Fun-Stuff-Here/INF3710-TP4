import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-jardin-item',
  templateUrl: './jardin-item.component.html',
  styleUrls: ['./jardin-item.component.css']
})
export class JardinItemComponent implements OnInit {

  @Input() item: any;
  constructor() { }

  ngOnInit() {
  }

}