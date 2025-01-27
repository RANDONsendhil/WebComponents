const template = document.createElement("template");
template.innerHTML = `
<label id="id_label"></label>
`;

class AccDiv extends HTMLElement {
	$wrapper;
	static get observedAttributes() {
		return ["value"];
	}

	// define getters and setters for attributes
	get value() {
		return this.getAttribute("value");
	}
	set value(value) {
		this.setAttribute(value);
	}

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		this.$wrapper = this.shadowRoot.querySelector("label");
	}
	connectedCallback() {
		console.log(this.$wrapper);
		this.$wrapper.setAttribute("aria-label", this.value);
		this.render();
	}

	render() {
		return (this.$wrapper.innerHTML = this.value);
	}
}
customElements.define("acc-label", AccDiv);
