import { AccountService } from './../../services/account.service';
import { Component, OnInit, Input } from '@angular/core';
import { Photo } from 'src/app/_models/photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];

  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.initializeUploader();
  }


  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.accountService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType:['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10*1024*1024
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; }
  }


}
