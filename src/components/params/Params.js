import { DomComponent } from '@core/DomComponent';

export class Params extends DomComponent {
  static className = 'params';

  constructor($root) {
    super($root, {
      name: 'Params',
      listeners: ['input', 'click']
    });
  }

  toHTML() {
    return `
      <h2 class="params__title">Box parameters</h2>
      <form class="params__form">
        <div class="params__items">
          <div class="params__item">
            <label class="params__label" for="length">length</label>
            <input class="params__input" type="text" name="length" id="length">
          </div>
          <div class="params__item">
            <label class="params__label" for="width">width</label>
            <input class="params__input" type="text" name="width" id="width">
          </div>
          <div class="params__item">
            <label class="params__label" for="height">height</label>
            <input class="params__input" type="text" name="height" id="height">
          </div>
        </div>
        <button class="params__btn">Apply</button>
      </form>
    `;
  }

  onInput(event) {
    console.log('Params: onInput', event);
  }

  onClick(event) {
    console.log('Params: onClick', event.target.classList);
    event.preventDefault();
  }
}