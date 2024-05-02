import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string='';
  pass:string='';

  constructor(private router:Router, private auth:AuthService) { }

  ngOnInit() {}

  async connect(){
    console.log(this.email, this.pass);
    // this.auth.login(this.email, this.pass).then(result=>{
    //   if(result == "success"){
    //   }else{
    //     // show toast notification of login error
    //   }
    // })

    this.router.navigateByUrl("/shippings/home");
    
  }


}
