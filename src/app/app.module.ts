import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ModalModule, BsDatepickerModule } from 'ngx-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { ArticleComponent } from './article/article.component';
import { SafeHtml } from './pipes/safeHtml.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    SafeHtml
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot()
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
