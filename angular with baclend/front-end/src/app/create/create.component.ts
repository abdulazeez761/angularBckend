import { Component, OnInit } from '@angular/core';
import{FormControl, FormGroup , Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private apiservice: ApiserviceService , private route: ActivatedRoute) { }

  errMessage:any;
  successMessage:any;
  paramId:any;
  ngOnInit() {
    // console.log(this.route.snapshot.paramMap.get('id'))
    this.paramId = this.route.snapshot.paramMap.get('id')
    this.apiservice.getSimgleUser(this.paramId).subscribe((result=>{
      console.log(result.data , result.message)
      this.userform.patchValue({
        fullname:result.data[0].fullname,
        email:result.data[0].email,
        mobile:result.data[0].mobile,
      })
    }))
  }

  userform = new FormGroup({
    'fullname':new FormControl('' , Validators.required),
    'email':new FormControl('' , Validators.required),
    'mobile':new FormControl('' , Validators.required)
  })
  //create a new user
  userSubmit(){
    if(this.userform.valid){
      this.apiservice.createNewUser(this.userform.value).subscribe((data)=>{
        console.log(data)
        this.userform.reset()
        this.successMessage = data.message
      })
    }else{
     this.errMessage = 'all fields are required'
    }
  }
  //update user
  userUpdate(){
    // this.apiservice.updateUser(`this.userform.value`).subscribe((res)=>{

    // })
    // console.log(this.userform.value)
    if(this.userform.valid){
      this.apiservice.updateUser(this.userform.value, this.paramId).subscribe((res)=>{
        this.successMessage = res.message
      })
    }else{
      this.errMessage = 'all fields are required'
    }
  }
}
