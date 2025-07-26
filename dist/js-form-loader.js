const style = document.createElement('style');

style.textContent = `
.js-form-loader-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}
.js-spinner-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.js-form-loader-spinner {
    width: 3rem;
    height: 3rem;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #0d6efd;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;

document.head.appendChild(style);

class FormLoader {

    constructor(element) {
        this.element = element;
        this.originalPosition = window.getComputedStyle(element).position;
        if (this.originalPosition === 'static') {
            this.element.style.position = 'relative';
        }
    }
    
    createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'js-form-loader-overlay';
        
        const spinnerContainer = document.createElement('div');
        spinnerContainer.className = 'js-spinner-container';
        
        const spinner = document.createElement('div');
        spinner.className = 'js-form-loader-spinner';
        
        spinnerContainer.appendChild(spinner);
        overlay.appendChild(spinnerContainer);
        
        return overlay;
    }
    
    show() {
        const overlay = this.createOverlay();
        this.element.appendChild(overlay);
    }
    
    hide() {
        const overlay = this.element.querySelector('.js-form-loader-overlay');
        if (overlay) {
            overlay.remove();
        }
        if (this.originalPosition === 'static') {
            this.element.style.position = 'static';
        }
    }
}

HTMLElement.prototype.loader = function() {
    if (!this._formLoader) {
        this._formLoader = new FormLoader(this);
    }
    return this._formLoader;
}