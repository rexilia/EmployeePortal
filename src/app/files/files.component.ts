import { Component, OnInit, Inject } from '@angular/core';
import { from } from 'rxjs';
import { finalize } from "rxjs/operators";
import { FileService } from './file.service';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  selectedImage: any = null;
  url:string;
  id:string;
  file:string;

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage, @Inject(FileService) private fileService: FileService) { }

  ngOnInit(): void {
    this.fileService.getImageDetailList();
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }
  save() {
    var name = this.selectedImage.name;
    const fileRef = this.storage.ref(name);
    this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.url = url;
          this.fileService.insertImageDetails(this.id,this.url);
          alert('Upload Successful');
        })
      })
    ).subscribe();
  }
  view(){
    this.fileService.getImage(this.file);
  }
}



  