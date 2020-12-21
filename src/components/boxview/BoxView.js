import { DomComponent } from '@core/DomComponent';

export class BoxView extends DomComponent {
  static className = 'box-view';

  toHTML() {
    return `
    <p>box-view</p>
    `;
  }
}