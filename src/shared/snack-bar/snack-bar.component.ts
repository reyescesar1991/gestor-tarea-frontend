import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type SnackType = 'success' | 'error' | 'warning' | 'info';

@Component({
  selector: 'app-snack-bar',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.scss',
  animations: [
    trigger('slideIn', [
      state('void', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      state('visible', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('void => visible', animate('300ms ease-out')),
      transition('visible => void', animate('300ms ease-in'))
    ])
  ],
})
export class SnackBarComponent {

  @Input() message: string = '';
  @Input() type: SnackType = 'info';
  @Input() duration: number = 3000;
  
  visible: boolean = false;
  private timeout: any;

  ngOnInit() {
    this.visible = true;
    this.timeout = setTimeout(() => {
      this.close();
    }, this.duration);
  }

  ngOnDestroy() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  close() {
    this.visible = false;
  }

  getIcon(): string {
    switch (this.type) {
      case 'success': return '✓';
      case 'error': return '!';
      case 'warning': return '⚠';
      case 'info': return 'i';
      default: return '';
    }
  }
}
