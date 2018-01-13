import Component from '../components/Component';
import Element from '../components/dom/Element';
import Str from "../components/util/Str";

class Input extends Component {

    /**
     * Input constructor
     *
     * @param element
     */
    constructor(element) {
        super(element);

        this.checkForChanges();

        for (let attribute in this.element.getData()) {
            if (this['apply' + Str.ucFirst(attribute)]) this['apply' + Str.ucFirst(attribute)].call(this);
        }
    }

    /**
     * function that adds a cross to the input, which on clicked erases the input's value
     */
    applyErasable() {
        let parent = this.element.parent();

        if (parent.hasClass('input-erasable')) {
            parent.find('.erase').on('click', () => this.element.val(''))
        }
    }

    /**
     * Function that filters the input's value of characters that doesn't match the applied
     * match pattern. These chraracters are removed from the input's value
     *
     * @return void
     */
    applyMatch() {
        this.element.on(['keyup', 'keydown'], (element, e) => {
            let value = String.fromCharCode(e.which) || e.key;
            //make sure the pattern doesn't have leading or trailing slashes
            let reg = this.element.getData('match').replace(/^\/|\/$/g, '');

            if (!new RegExp(reg, 'gi').test(value)) {
                e.preventDefault();
                return false;
            }
        })
    }

    /**
     * Fires when the element loses focus
     *
     */
    onBlur() {
        this.removeErrors();
    }

    /**
     * Fires when a key is released (while typing)
     */
    onKeyup() {
        this.applyValToElements();
    }

    /**
     * Fires when a key is pressed down
     */
    onKeydown() {
        this.applyValToElements();
    }

    /**
     *
     */
    applyValToElements() {
        let targets = new Element('[data-input-value="' + this.element.attr('id') + '"]');
        if (this.element.val() === "") {
            targets.text(" ");
        }
        else {
            targets.text(this.element.val());
        }
    }

    /**
     * Removes the error indication, if that exists
     *
     * @return {void}
     */
    removeErrors() {
        if (this.element.val().length > 0 && (this.element.parent().hasClass('has-error') || this.element.parent().hasClass('has-success'))) {
            this.element.parent().removeClass('has-error');
            this.element.parent().removeClass('has-success');
            this.element.next('.help-block').remove();
        }
    }

    checkForChanges() {

    }
}

export default Input;
