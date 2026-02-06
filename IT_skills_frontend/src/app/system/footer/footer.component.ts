import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit{

  footerText:string[]=["2","0","2","6",","," ","M","i","n","d","e","n"," j","o","g"," f","e","n","n","t","a","r","t","v","a"];
  ngOnInit(): void {
      this.getFooterText();
  }

   getFooterText(){
    let FText:any=document.getElementById("footerText");
    for (let i = 0; i < this.footerText.length; i++) {
      setTimeout(() => {
        FText.innerText+=this.footerText[i];
      }, 1);
      
    }
  }
}
