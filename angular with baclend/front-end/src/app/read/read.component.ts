import { Component, OnInit } from '@angular/core';
import{ApiserviceService} from '../apiservice.service'
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor(private apiserv:ApiserviceService) { }

  usersData: any;
  successMessage:any;

  ngOnInit() {
    this.getAllData()
  }
  deleteUser(id:any){
    this.apiserv.deleteUser(id).subscribe((response) => {
      console.log(response);
      this.successMessage = response.message;
      
     this.getAllData()
    })
  } 
  getAllData(){
    this.apiserv.getAllData().subscribe((data) => {
      this.usersData = data.data;
      
    })
  }
}
