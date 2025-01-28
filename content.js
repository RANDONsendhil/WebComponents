const template = document.createElement("template");
template.innerHTML = `
<style>
	#titleContent{
	font-weight:bold;
	font-size:20px;
	text-indent: 0px!important;
 }
 .container{
    text-indent: 50px;
    display: flex;
    background-color: #f3f6fb;
    justify-content: flex-end;
    align-content: flex-start;
    border-radius: 5px;
    padding: 11px;
    align-content: space-around;
    flex-direction: column;
    margin: 3px;
	}
 
</style>
<div class ="container">
<div  id="titleContent" tabindex="1"></div>
<div tabindex="0"><slot name="content"> </slot></div>
<div>

`;

class AccDiv extends HTMLElement {
	$title;
	static get observedAttributes() {
		return ["title"];
	}

	// define getters and setters for attributes
	get title() {
		return this.getAttribute("title");
	}
	set title(value) {
		this.setAttribute("title", value);
	}

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		this.$title = this.shadowRoot.querySelector("#titleContent");
	}
	connectedCallback() {
		this.$title.innerHTML = this.title;
	}

	render() {
		return (this.$wrapper.textContent = this.value);
	}
}
customElements.define("acc-content", AccDiv);
