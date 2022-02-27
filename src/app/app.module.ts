import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { formatWithOptions } from 'util';
import { PaymentComponent } from './payement/payement.component';

@NgModule({
  declarations: [AppComponent, AdminComponent, UserComponent, ForbiddenComponent, PaymentComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule ,SharedModule,FormsModule,NgxSkeletonLoaderModule,HttpClientModule,ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule {}
