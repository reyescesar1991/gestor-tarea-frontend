import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label-type',
  standalone: true,
  imports: [NgClass],
  templateUrl: './label-type.component.html',
  styleUrl: './label-type.component.scss'
})
export class LabelTypeComponent {

    @Input() typeMessage = '';
}
