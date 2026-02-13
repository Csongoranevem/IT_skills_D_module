import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit{


  ngOnInit(): void {
      this.getFooterText("2026, Minden jog fenntartva!");
  }

 getFooterText(szoveg:string){
  let footerText: any=document.getElementById('footerText');
  let counter = 0, my_delay = setInterval(() => {
    if(counter<szoveg.length) footerText.innerHTML += szoveg[counter++];
    else clearInterval(my_delay);
}, 60);

  }

}
