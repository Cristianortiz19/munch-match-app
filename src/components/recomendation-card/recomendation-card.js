class RecomendationCard extends HTMLElement {
    constructor() {
        super()
        this.name = this.getAttribute('name');
        this.nameText = this.getAttribute('nameText')
    }

    static get observedAttributes() {
        return []; 
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(propName, oldValue, newValue) {
        this[propName] = newValue
        this.render
    }

    render() {
        this.innerHTML = `
        <link rel="stylesheet" href="../components/recomendation-card/style.css">
        <div class="recomendation-card">
            <img class="plate-img" src="../public/images/${this.name}.webp" alt="" />
            <div class="card-text">
                <h4>${this.nameText}</h4>
                <p></p>
            </div>
        </div>
        `;
    }
}

customElements.define('recomendation-card', RecomendationCard)
export default RecomendationCard;