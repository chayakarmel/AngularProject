import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  items = [
    {
      text: 'כנסים ואירועים',
      icon: 'https://www.johnbryce.co.il/wp-content/uploads/2023/05/5.png'
        },
    {
      text: 'קורסים למנהלים',
      icon: 'https://www.johnbryce.co.il/wp-content/uploads/2023/06/chair-i.png'
    },
    {
      text: 'קורסי הכשרה לעולם ההייטק',
      icon: 'https://www.johnbryce.co.il/wp-content/uploads/2023/04/Star.svg' },
    {
      text: 'קורסים מקצועיים למתקדמים',
      icon: 'https://www.johnbryce.co.il/wp-content/uploads/2023/06/shape-876@2x.png'}
  ];
  selectedItem: any = null;

  selectBox(item: any) {
    this.selectedItem = item;
  }

  isSelected(item: any): boolean {
    return this.selectedItem === item;
  }
}
