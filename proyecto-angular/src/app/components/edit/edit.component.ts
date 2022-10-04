import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['../create/create.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {
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
    this.title = "Editar proyecto";
    this.project = new Project("", "", "", "", "", 2022, "");
    this.url = Global.url;
    this.message = 'Proyecto editado correctamente';
  
  };

  ngOnInit(){
  	this._route.params.subscribe(params => {
  		let id = params['id'];

  		this.getProject(id);
  	});
  }

  getProject(id: string){
  	this._projectService.getProject(id).subscribe(
  		response => {
  			this.project = response.project;
  		},
  		error => {
  			console.log(<any>error);
  		}
  	)
  }

  onSubmit(form: any) {
    
    //Guarda los datos
    this._projectService.updateProject(this.project).subscribe(
      response => {
        if (response.project) {
         

          //Subir la imagen
          if(this.filesToUpload.length){
            this._uploadService.makeFileRequest(Global.url+'upload-image/'+response.project._id, [], this.filesToUpload, 'image').then((result:any)=>{
              this.status = 'success';
              this.saveProject = result.project;
              form.reset();
            });
          } else{
            this.saveProject = response.project;
            this.status = 'success';
          }
          
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
