import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-style-button',
  templateUrl: './style-button.component.html',
  styleUrls: ['./style-button.component.css']
})
export class StyleButtonComponent implements OnInit {

  constructor(private dialog: MatDialogRef<StyleButtonComponent>) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialog.close();
  }

}
