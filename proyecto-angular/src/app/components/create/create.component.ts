import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

  public saveProject: any;
  public title: string;
  public project: Project;
  public status: string | undefined ;
  public filesToUpload: Array<File> = []; 
  public url: string;
  public message: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _router: Router,
  	private _route: ActivatedRoute

  ) {
    this.title = "Crear proyecto";
    this.project = new Project("", "", "", "", "", 2019, "");
    this.url = Global.url;
    this.message = 'Proyecto creado correctamente';
  
  };


  ngOnInit(): void {
  }

  onSubmit(form: any) {
    
    //Guarda los datos
    this._projectService.saveProject(this.project).subscribe(
      response => {
        if (response.project) {
         

          //Subir la imagen
          this._uploadService.makeFileRequest(Global.url+'upload-image/'+response.project._id, [], this.filesToUpload, 'image').then((result:any)=>{
            this.status = 'success';
            this.saveProject = result.project;
            form.reset();
          })

          
        } else {
          this.status = 'failed';
        }
      },
      error => {
        console.log(<any>error)
      }
    )
  }

  fileChangeEvent(fileInput:any){
    this.filesToUpload= <Array<File>>fileInput.target.files;
  }
}
