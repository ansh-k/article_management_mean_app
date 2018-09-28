import { Component, OnInit, TemplateRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { DataService } from '../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };
  articleForm: FormGroup;
  base64textString:String = "";
  minDate: Date;
  articles:Array<any>;
  pipe = new DatePipe('en-US');
  articleToUpdate:String;
  
  constructor(private modalService: BsModalService, private fb: FormBuilder,private dataService: DataService, private toastr: ToastrService) {
    this.minDate = new Date();
  }

  ngOnInit() {
    this.initialise_form();
    this.getArticles();  
  }

  initialise_form() {
    this.articleForm = this.fb.group({
      'title': [null, Validators.required],
      'image': [null, Validators.required],
      'description': [null, Validators.required],
      'publish_date': [null,Validators.required],
    });
  }

  getArticles() {
    // Access the Data Service's getArticles() method
    this.dataService.getArticles()
    .subscribe(res => {
      this.articles = res;
    },
    error => {
      this.toastr.error(error);
    });
  }

  addArticle(template) {
    this.initialise_form();
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  handleFileSelect(evt){
    let files = evt.target.files;
    let file = files[0];
    if (files && file) {
      let reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }
    
  _handleReaderLoaded(readerEvt) {
    let binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
  }

  saveArticle(data) {
    if(this.base64textString) data.image = this.base64textString; 
    if(this.articleToUpdate) data._id = this.articleToUpdate;
    this.dataService.saveArticle(data)
    .subscribe(res => {
      this.update_list(res,data);
      this.reset();
      this.toastr.success('Article Saved!');
    },
    error => {
      this.toastr.error(error);
    });
  }

  update_article(article,template) {
    this.base64textString = article.image;
    this.articleToUpdate = article._id;
    this.articleForm.controls['image'].setValidators(null);
    this.articleForm.setValue({
      'title': article.title,
      'description': article.description,
      'publish_date': this.pipe.transform(article.publish_date, 'MM/dd/yyyy'),
      'image': null
    });
    this.openModal(template);
  }

  reset(){
    this.modalRef.hide();
    this.articleForm.reset();
    this.articleToUpdate = null;
  }

  update_list(res, data) {
    if(data._id) {
      this.getArticles();
    } else {
      this.articles.unshift(res);
    }
  }
}
