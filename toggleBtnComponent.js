const template = document.createElement("template");
template.innerHTML = `
<div class="flex-container">
   <span>Accessiblity Zoom Button</span>
  <div id="divSwitch" name="Button-zoom">
  <label class="switch">
  <input type="checkbox" id="checkboxtoggle" >
  <span class="slider round">
 
</label>
</div>
<div style="position: relative;top: 0px;"><span>Is Toggled:</span><span id=isToggled></span></div>
</div> 
    
 <style> 

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.flex-container{
    display: flex;
    align-content: flex-end;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
	border-radius:5px;
  }

.flex-container>div {
  margin: 10px;
}
   
#divSwitch{
border-radius: 20px;
}
 
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #0e9aee;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
`;
class AccToggleBtn extends HTMLElement {
	$checkboxtoggle;
	$divSwitch;
	$accName;

	static get observedAttributes() {
		return ["active", "name"];
	}

	get active() {
		return this.getAttribute("active");
	}

	set active(val) {
		this.setAttribute("active", val);
	}

	get name() {
		return this.getAttribute("name");
	}

	set name(val) {
		this.setAttribute("name", val);
	}

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		this.$checkboxtoggle = this.shadowRoot.querySelector("#checkboxtoggle");
		this.$divSwitch = this.shadowRoot.querySelector("#divSwitch");
		this.$isToggled = this.shadowRoot.querySelector("#isToggled");
		this.$accName = this.shadowRoot.querySelector("Button-zoom");
	}

	handleChange() {
		this.dispatchEvent(new CustomEvent("my-event", { bubbles: true, composed: true }));
	}

	connectedCallback() {
		console.log("CONNECTED CALL BACK FOR BTN");
		this.$checkboxtoggle.addEventListener("change", this._checkboxtoggleEvtHandler.bind(this));
		this.$checkboxtoggle.addEventListener("focus", this._checkboxtoggleEvtHandler.bind(this));
		this.$divSwitch.addEventListener("mousemove", this._checkboxtoggleEvtHandler.bind(this));
		this.$divSwitch.addEventListener("mouseout", this._checkboxtoggleEvtHandler.bind(this));
		this.$divSwitch.addEventListener("focusout", this._checkboxtoggleEvtHandler.bind(this));
		this.$isToggled.innerHTML = this.$checkboxtoggle.checked;
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this.$isToggled.innerHTML = newValue;
		if (name === "active") {
			this.$checkboxtoggle.setAttribute("aria-label", this.name + " " + this.active);
		}
	}

	_checkboxtoggle(event) {
		console.log(this.$checkboxtoggle.checked);
	}

	_checkboxtoggleEvtHandler(event) {
		switch (event.type) {
			case "mousemove":
			case "focus":
				console.log(event.type);
				this.$divSwitch.style.border = "thick solid #214ea7";
				break;
			case "mouseout":
			case "focusout":
				this.$divSwitch.style.border = "none";
				break;
			case "change":
				console.log("For Change --> " + event.type);

				this.active = this.$checkboxtoggle.checked;
				const action = this.getAttribute("action");
				if (action) {
					new Function(action).call(this);
				}
				break;
			default:
				break;
		}
	}
}

customElements.define("acc-toggle-btn", AccToggleBtn);
