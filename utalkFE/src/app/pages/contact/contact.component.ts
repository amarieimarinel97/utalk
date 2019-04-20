import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var contactLink=document.getElementById("contact-link");
    contactLink.style.color="#333";
    contactLink.style.cursor="default";
    contactLink.style.userSelect="none";
  }

}
