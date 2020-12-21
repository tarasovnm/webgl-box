import { DomComponent } from '@core/DomComponent';

export class BoxView extends DomComponent {
  static className = 'box-view';

  constructor($root, options) {
    super($root, {
      name: 'BoxView',
      ...options
    });
  }

  toHTML() {
    return `
      <p>box-view</p>
    `;
  }

  init() {
    super.init();
    this.$on('ENTERED_SIZE', data => {
      console.log('Box View recieved sizes', data);
    })
  }
}