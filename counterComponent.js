
// define the component's HTML template
const template = document.createElement('template');
template.innerHTML = `
  <style>
    button {
      width: 50px;
      height: 50px;

      border: 1px solid red;
      background: #0e9aee;
      color: white;
      font-weight: bold;

      cursor: pointer;
    }

    button:active {
      background-color: #6b8bec;
    }

    span {
      display: inline-block;
      margin: 0 5px;
      min-width: 25px;

      text-align: center;
    }
  </style>

  <button id="increaseBtn">+</button>
  <span id="label"></span>
  <button id="decreaseBtn">-</button>
`;

export class CounterComponent extends HTMLElement {
  // define the observedAttributes array 
  static get observedAttributes() {
    return ['value'];
  }

  // define getters and setters for attributes
  get value() {
    return this.getAttribute('value');
  }

  set value(val) {
    if (val) {
      this.setAttribute('value', val);
    } else {
      this.removeAttribute('value');
    }
  }

  get step() {
    return this.getAttribute('step');
  }

  set step(val) {
    if (val) {
      this.setAttribute('step', val);
    } else {
      this.removeAttribute('step');
    }
  }

  // define properties to store references to DOM elements in the component's template
  $increaseButton;
  $decreaseButton;
  $label;

  constructor() {
    // always do a super() call first to ensure that the component inherits the correct prototype chain and all properties and methods of the class it extends. 
    super();

    // optional: Attach Shadow DOM to the component
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // set references to the DOM elements from the component's template
    this.$increaseButton = this.shadowRoot.querySelector('#increaseBtn');
    this.$decreaseButton = this.shadowRoot.querySelector('#decreaseBtn');
    this.$label = this.shadowRoot.querySelector('#label');
  }
  connectedCallback() {
    // add event listeners on both buttons
    // we bind "this" to the callback of the listener to attach the component's scope.
    this.$increaseButton.addEventListener('click', this._increase.bind(this));
    this.$decreaseButton.addEventListener('click', this._decrease.bind(this));
  
  }
  disconnectedCallback() {
    // remove event listeners on both buttons
    this.$increaseButton.removeEventListener('click', this._increase.bind(this));
    this.$decreaseButton.removeEventListener('click', this._decrease.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.$label.innerHTML = "Zoom: "+newValue;
  }

  adoptedCallback() {
    console.log('I am adopted!');
  }

  _increase() {
    const step = +this.step;
    const value = +this.value;
    this.value = String(value + step);
  }

  _decrease() {
    const step = +this.step;
    const value = +this.value;
    this.value = String(value - step);
  }
}

customElements.define('zoom-value', CounterComponent);