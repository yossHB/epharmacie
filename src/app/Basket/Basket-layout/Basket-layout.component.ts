import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'll-Basket-layout',
  templateUrl: './Basket-layout.component.html',
  styleUrls: ['./Basket-layout.component.scss']
})
export class BasketLayoutComponent implements OnInit {
  isLessThenLargeDevice;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {}

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 1199px)']).subscribe(({ matches }) => {
      this.isLessThenLargeDevice = matches;
    });
  }
  onLogout(): void {
    this.router.navigate(['auth/login']);
  }
}
