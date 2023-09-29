import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
@Component({
  selector: 'app-splash-screem',
  templateUrl: './splash-screem.page.html',
  styleUrls: ['./splash-screem.page.scss'],
})
export class SplashScreemPage implements OnInit {

  constructor(private router:Router) {

    setTimeout(()=>{
      this.router.navigateByUrl('home');

    },2000)
   }   

  ngOnInit() {
  }

}
