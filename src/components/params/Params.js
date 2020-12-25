import { DomComponent } from '@core/DomComponent';
import { isCorrect } from '@core/utils';

export class Params extends DomComponent {
  static className = 'params';

  constructor($root, options) {
    super($root, {
      name: 'Params',
      listeners: ['keydown', 'click'],
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
        <p>Acceptable values: more than 0 and up to 10</p>
        
        <button class="params__btn">Apply</button>
        <span class="params__error">Please enter correct values</span>
      </form>
    `;
  }

  onKeydown(event) {
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
      '.', 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];

    if (!keys.includes(event.key)) {
      event.preventDefault();
    }
  }

  onClick(event) {
    event.preventDefault();
    if (event.target.classList.contains('params__btn')) {
      const length = parseFloat(this.$root.find('#length').text());
      const width = parseFloat(this.$root.find('#width').text());
      const height = parseFloat(this.$root.find('#height').text());

      if (isCorrect(length) && isCorrect(width) && isCorrect(height)) {
        this.$root.find('.params__error').removeClass('params__error--v');
        this.$emit('ENTERED_SIZE', { length, width, height })
      } else {
        this.$root.find('.params__error').addClass('params__error--v');
      }
    }
  }
}

