import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StyleButtonComponent } from '../style-button/style-button.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(StyleButtonComponent,{
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {

    })
  }

}
