import { Component } from '@angular/core';
import { ViewthreejscuborubikComponent } from "../page/viewthreejscuborubik/viewthreejscuborubik.component";
import { ViewthreejststComponent } from "../page/viewthreejstst/viewthreejstst.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ViewthreejscuborubikComponent, ViewthreejststComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
