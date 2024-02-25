import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/layout/header/header.component';
import { ProductsComponent } from './pages/products/products.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { CountUpModule } from 'ngx-countup';
import { NgxApexchartsModule } from 'ngx-apexcharts';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { AdminProductsComponent } from './pages/admin/admin-products/admin-products.component';
import { NgToastModule } from 'ng-angular-popup';
import { UsersComponent } from './pages/admin/users/users.component';
import { NewsComponent } from './pages/news/news.component';
import { AdminMessagesComponent } from './pages/admin/admin-messages/admin-messages.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        ProductsComponent,
        ContactsComponent,
        AboutComponent,
        LoginComponent,
        DashboardComponent,
        SidebarComponent,
        AdminProductsComponent,
        UsersComponent,
        NewsComponent,
        AdminMessagesComponent
        
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        RouterModule,
        CommonModule,
        GoogleMap,
        MapMarker,
        FormsModule,
        CountUpModule,
        NgxApexchartsModule,
        NgToastModule,
       
    ],
    providers: [
        provideClientHydration(),
        provideHttpClient(
            withInterceptors([tokenInterceptor]),
            withFetch()
        )
        
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
