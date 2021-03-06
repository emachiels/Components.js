import Component from "../components/Component";
import Node from "../components/dom/Node";

class Input extends Component {

    /**
     * Input constructor
     *
     * @param element
     */
    constructor(element) {
        super(element);

        this.inheritsValue = new Node(`[data-input-value='${this.element.attr("id")}']`);

        this.checkForChanges();
    }

    /**
     * function that adds a cross to the input, which on clicked erases the input's value
     */
    applyErasable() {
        let parent = this.element.parent();

        if (parent.hasClass("input-erasable")) {
            parent.find(".erase").on("click", () => this.element.val(""));
        }
    }

    /**
     * Function that filters the input's value of characters that doesn't match the applied
     * match pattern. These chraracters are removed from the input's value
     *
     * @return void
     */
    applyMatch() {
        this.element.on(["keyup", "keydown"], () => {
            //make sure the pattern doesn't have leading or trailing slashes
            let reg = this.element.getData("match").replace(/^\/|\/$/g, "");
            let value = this.element.val();

            for(let i = 0; i < value.length; i++) {
                let char = value.charAt(i);
                if(!new RegExp(reg, "gi").test(char)) {
                    value = value.substr(0, i) + value.substr(i + 1);
                }
            }

            this.element.val(value);
        });
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
        if (this.element.val() === "") {
            this.inheritsValue.text(" ");
        }
        else {
            this.inheritsValue.text(this.element.val());
        }
    }

    /**
     * Removes the error indication, if that exists
     *
     * @return {void}
     */
    removeErrors() {
        let parent = this.element.parent();

        if (this.element.val().length > 0 && (parent.hasClass("has-error") || parent.hasClass("has-success"))) {
            parent.removeClass("has-error");
            parent.removeClass("has-success");
            parent.find(".help-block").remove();
        }
    }

    checkForChanges() {

    }
}

export default Input;
