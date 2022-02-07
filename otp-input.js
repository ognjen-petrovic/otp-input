
class OTPInputElement extends HTMLElement {
    constructor() {
        super()

        const style = `
        fieldset{
            padding:0;
            border:0;
            display:flex;
            justify-content: space-between;
            gap:1ch;

        }
        input{
            display: inline-block;
            width: 2ch;            
            text-align: center;
            height:100%;
            font-size: xx-large;
        }
        `
        this.attachShadow({ mode: 'open' })
        const style_el = document.createElement('style')
        style_el.textContent = style

        this.fieldset = document.createElement('fieldset')
        let length = parseInt(this.getAttribute('length'));
        if (isNaN(length)) {
            length = 6
        }
        const a = []
        for (let i = 0; i < length; ++i) {
            let div = document.createElement('input');
            a.push(div)
        }
        this.fieldset.append(...a);
        this.shadowRoot.append(style_el, this.fieldset)

        this.fieldset.addEventListener('input', (e) => {
            if (e.inputType == 'deleteContentBackward') return
            if (e.target.nextElementSibling != null) {
                e.target.nextElementSibling.focus()
            }
            else {
                e.target.blur();
            }
           
            this.dispatchChangeEvent()
        })

        this.fieldset.addEventListener('keyup', (e) => {
            if (e.key == 'Backspace') {
                if (e.target.previousElementSibling != null){
                    e.target.previousElementSibling.focus()
                    this.dispatchChangeEvent()
                }
                    
            }
        })

        this.addEventListener('paste', (e) => {
            e.preventDefault();
            let txt = (e.clipboardData || window.clipboardData).getData('text');
            if (txt.length >= this.fieldset.childElementCount) {
                this.value = txt
            }
        })

        Array.from(this.fieldset.children).forEach(el => {
            el.addEventListener('focus', () => {
                el.select()
            })
        })

        if (this.hasAttribute('disabled')) {
            this.disabled = true
        }
    }

    dispatchChangeEvent(){
        if (this.value.length == this.fieldset.childElementCount) {
            this.setAttribute('filled', true)
        }else{
            this.removeAttribute('filled')
        }

        this.dispatchEvent(new Event('change'))
    }

    clear() {
        this.value = ''
    }

    get value() {
        let value = ''
        for(let c of this.fieldset.children) {
            value += c.value
        }
        return value       
    }

    set value(v) {
        for (let i = 0; i < this.fieldset.childElementCount; ++i) {
            this.fieldset.children[i].value = v[i] ? v[i] : ''
        }
        this.dispatchChangeEvent()
    }

    set disabled(value) {
        if (value){
            this.setAttribute('disabled', true)
            this.fieldset.setAttribute('disabled', true)
        }
        else {
            this.removeAttribute('disabled')
            this.fieldset.removeAttribute('disabled')
        }         
    }

    get filled() {
        return this.hasAttribute('filled')
    }

    get disabled(){ return this.hasAttribute('disabled')}
}

customElements.define('otp-input', OTPInputElement )