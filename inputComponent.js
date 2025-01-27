const template = document.createElement("template");
template.innerHTML = `
<style>

*{
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
 
.container{
  max-width: auto;
  background: #fff;
  width: 800px;
 
}
.container .text{
  text-align: center;
  font-size: 41px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  background: -webkit-linear-gradient(right, #56d8e4, #9f01ea, #56d8e4, #9f01ea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
 
.container form .form-row{
  display: flex;
  margin: 32px 0;
}
form .form-row .input-data{
  width: 100%;
  height: 40px;
  margin: 0 20px;
  position: relative;
}
form .form-row .textarea{
  height: 70px;
}
.input-data input,
.textarea textarea{
  display: block;
  width: 100%;
  height: 100%;
  border: none;
  font-size: 17px;
  border-bottom: 2px solid rgba(0,0,0, 0.12);
}
.input-data input:focus ~ label, .textarea textarea:focus ~ label,
.input-data input:valid ~ label, .textarea textarea:valid ~ label{
  transform: translateY(-20px);
  font-size: 14px;
  color: #3498db;
}
.textarea textarea{
  resize: none;
  margin:9px:2px;
}
.input-data label{
  position: absolute;
  pointer-events: none;
  bottom: 17px;
  font-size: 16px;
  transition: all 0.3s ease;
}
 
.input-data .underline{
  position: absolute;
  bottom: 0;
  height: 2px;
  width: 100%;
}
.input-data .underline:before{
  position: absolute;
  content: "";
  height: 2px;
  width: 100%;
  background: #3498db;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.3s ease;
}
.input-data input:focus ~ .underline:before,
.input-data input:valid ~ .underline:before,
.textarea textarea:focus ~ .underline:before,
.textarea textarea:valid ~ .underline:before{
  transform: scale(1);
}
.submit-btn .input-data{
  overflow: hidden;
  height: 45px!important;
  width: 25%!important;
}
.submit-btn .input-data .inner{
  height: 100%;
  width: 300%;
  position: absolute;
  left: -100%;
  background: -webkit-linear-gradient(right, #56d8e4, #9f01ea, #56d8e4, #9f01ea);
  transition: all 0.4s;
}
.submit-btn .input-data:hover .inner{
  left: 0;
}
.submit-btn .input-data input{
  background: none;
  border: none;
  color: #fff;
  font-size: 17px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  position: relative;
  z-index: 2;
}
@media (max-width: 700px) {
  .container .text{
    font-size: 30px;
  }
  .container form{
    padding: 5px 0 0 0;
  }
  .container form .form-row{
    display: block;
    
  }
  form .form-row .input-data{
    margin: 35px 0!important;
  }
  .submit-btn .input-data{
    width: 40%!important;
  }
 
}
</style>
<div class="container">
    <form>
    <div class="form-row">
      <div class="input-data" >
        <input type="text" required>
        <div class="underline"></div>
       <label><acc-label id="input-label"> </acc-label></label>
      </div>
    </div>
  </form>
</div>
`;

class AccInput extends HTMLElement {
	$label;
	$lname;

	static get observedAttributes() {
		return ["lname"];
	}

	get labelText() {
		return this.getAttribute("labelText");
	}

	set labelText(val) {
		this.setAttribute("labelText", val);
	}

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		this.$lname = this.shadowRoot.querySelector(".input-data");
		this.$label = this.shadowRoot.querySelector("#input-label");
	}

	connectedCallback() {
		console.log("CONNECTED CALL BACK FOR INPUT c====>" + this.labelText);
		this.$lname.setAttribute("aria-label", "First Name");
		this.$label.setAttribute("value", this.labelText);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		console.log(`Attribute ${name} has changed.`);
	}
}
customElements.define("acc-input", AccInput);
