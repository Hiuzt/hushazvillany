import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/layout/header/header.component';
import { ProductsComponent } from './pages/products/products.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { UsersComponent } from './admin/users/users.component';
import { NewsComponent } from './pages/news/news.component';
import { AdminMessagesComponent } from './admin/admin-messages/admin-messages.component';
import { AdminNewsComponent } from './admin/admin-news/admin-news.component';

const routes: Routes = [
    {path: "", component: HeaderComponent, children: [
        { path: "", component: HomeComponent},
        { path: "products", component: ProductsComponent},
        { path: "about", component: AboutComponent},
        { path: "news", component: NewsComponent},
        { path: "contacts", component: ContactsComponent},   
    ]},     
    {path: "admin/login", component: LoginComponent},
    {path: "", component: SidebarComponent, children: [
        {path: "admin/dashboard", component: DashboardComponent, canActivate:[authGuard]},
        {path: "admin/products", component: AdminProductsComponent, canActivate:[authGuard]},
        {path: "admin/users", component: UsersComponent, canActivate:[authGuard]},
        {path: "admin/messages", component: AdminMessagesComponent, canActivate:[authGuard]},
        {path: "admin/news", component: AdminNewsComponent, canActivate:[authGuard]},
    ]}      
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
