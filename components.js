// class AccDiv extends HTMLElement{
//   constructor(){
//     super();
//     this.createSpan = document.createElement('span');
//     this.createSpan.innerHTML = 'First created span';
//     this.appendChild(this.createSpan)

//     this.accElement  = document.createElement('span');
//     this.accElement.innerHTML = this.getAttribute('accElement');
//     this.appendChild(this.accElement)

// }
//   connectedCallBack(){

//   }
// }
// window.customElements.define("acc-div", AccDiv);

const template = document.createElement("template");
template.innerHTML = `
<p><slot name="accSlot">SLOT NOT AVAILABLE</slot></p>
`;

class AccDiv extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
	}
	connectedCallback() {
		const shadow = this.shadowRoot;
		const slot = shadow.querySelector("slot");
	}
}
customElements.define("acc-slot", AccDiv);

//const accDivElement = new AccDiv();
//document.body.appendChild(accDivElement)
