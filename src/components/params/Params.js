import { DomComponent } from '@core/DomComponent';

export class Params extends DomComponent {
  static className = 'params';

  constructor($root, options) {
    super($root, {
      name: 'Params',
      listeners: ['input', 'click'],
      ...options
    });
  }

  toHTML() {
    return `
      <h2 class="params__title">Box parameters</h2>
      <form class="params__form">
        <div class="params__items">
          <div class="params__item">
            <label class="params__label" for="length">length</label>
            <input class="params__input" type="text" name="length" id="length" data-size="length">
          </div>
          <div class="params__item">
            <label class="params__label" for="width">width</label>
            <input class="params__input" type="text" name="width" id="width" data-size="width">
          </div>
          <div class="params__item">
            <label class="params__label" for="height">height</label>
            <input class="params__input" type="text" name="height" id="height" data-size="height">
          </div>
        </div>
        <button class="params__btn">Apply</button>
      </form>
    `;
  }

  onInput(event) {
    // console.log('Params: onInput', event.target.dataset);
  }

  onClick(event) {
    if (event.target.classList.contains('params__btn')) {
      const lenght = parseInt(this.$root.find('#length').text());
      const width = parseInt(this.$root.find('#width').text());
      const height = parseInt(this.$root.find('#height').text());
      this.$emit('ENTERED_SIZE', { lenght, width, height })
    }
    event.preventDefault();
  }
} 