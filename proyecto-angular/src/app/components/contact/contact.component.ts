import { Component, OnInit, ViewChild ,ElementRef} from '@angular/core';
declare var jQuery:any;
declare var $:any;



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @ViewChild('texto', {static: true}) texto?: ElementRef;
  constructor() { }

  ngOnInit(): void {
console.log(this.texto)

   /*  $("header").css("background", "green");
    
    $(function(){
      $('.bxslider').bxSlider({
        mode: 'fade',
        captions: true,
        slideWidth: 600
      });
    }); */
  
  }



}
