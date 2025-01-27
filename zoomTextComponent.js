const template = document.createElement("template");
template.innerHTML = `
  <div id="textContent">
  <div style="position: relative;top: 9px;"><span>Is Text Context Zommed: </span> <span id=isZoomed></span></div>
  <br><br>
    <slot></slot>
  </div>
  
<style>

#textContent:hover {
    -webkit-transform: scale(1);
}

#textContent{
font-size:15px;
fontWeight:'normal';
display: inline; /* the default for span */
border: 1px solid blue;  
}

</style>  

`;

class AccZoomText extends HTMLElement {
  $textContent;
  $isZoomed;
  $zoomValue
  $active

  static get observedAttributes() {
    return ["active", "value"];
  }

  get active() {
    return this.getAttribute("active");
  }

  set active(val) {
    this.setAttribute("active", val);
  }

  get value() {
    return this.getAttribute("value");
  }

  set value(val) {
    this.setAttribute("value", val);
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open", delegatesFocus: true });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$textContent = this.shadowRoot.querySelector("#textContent");
    this.$isZoomed = this.shadowRoot.querySelector("#isZoomed");
  }

  connectedCallback() {
    this.$textContent.addEventListener("mousemove", this._getCursor.bind(this));
    this.$textContent.addEventListener("mouseout", this._mouseOut.bind(this));
    this.getBoolActive = false
  }

  attributeChangedCallback(name, oldValue, newValue) {

    switch (name) {
      case 'active':

        this.$active = newValue
        break;
      case 'value':
        this.$zoomValue = newValue
        break;
      default:
        break;
    }
  }

  _checkboxtoggle() {
    console.log(this.shadowRoot.delegatesFocus === true);
    customElem.focus();
  }

  _getCursor(event) {
    const rect = this.$textContent.getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;
    if (this.$active == "true") {
      if (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      ) {
        // increase font size when cursor is over the element
        let pixel = this.value + "px";
        this.$textContent.style.fontSize = pixel;

        this.$textContent.style.color = "black";
        this.$textContent.style.cursor = "pointer";
        this.$textContent.style.fontWeight = "bold";
        this.$isZoomed.innerHTML = true;

      } else {
        this.$textContent.style.fontSize = "15px"; // reset font size when cursor is not over the element
      }
    } else {
      console.log("Accessibility zoom is false");
      return

    }
  }
  _mouseOut() {
    if (this.$active) {
      this.$textContent.style.fontSize = "15px";
      this.$textContent.style.fontWeight="normal";
      this.$isZoomed.innerHTML = false;
      //this.active = false;
    }
  }
}

customElements.define("acc-zoom-text", AccZoomText);
