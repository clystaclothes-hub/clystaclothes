// Animated Multilingual Website Help System
class HelpWidget {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = {};
        this.helpContent = {};
        this.isOpen = false;
        this.init();
    }

    async init() {
        await this.loadTranslations();
        this.createWidget();
        this.bindEvents();
        this.detectLanguage();
    }

    async loadTranslations() {
        const languages = ['en', 'es', 'fr', 'de', 'zh', 'ja', 'ar', 'hi', 'pt', 'ru'];

        for (const lang of languages) {
            try {
                const response = await fetch(`translations/${lang}.json`);
                if (response.ok) {
                    this.translations[lang] = await response.json();
                }
            } catch (error) {
                console.warn(`Failed to load ${lang} translations`);
            }
        }
    }

    detectLanguage() {
        const userLang = navigator.language.split('-')[0];
        if (this.translations[userLang]) {
            this.currentLanguage = userLang;
        }
    }

    createWidget() {
        const container = document.createElement('div');
        container.className = 'help-widget-container';
        container.innerHTML = `
      <button class="help-button" id="helpButton" aria-label="Help">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </button>
      
      <div class="help-panel" id="helpPanel">
        <div class="help-header">
          <h3 data-i18n="help.title">How can we help?</h3>
          <button class="close-btn" id="closeBtn">&times;</button>
        </div>
        
        <div class="language-selector">
          <select id="languageSelect">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="zh">中文</option>
            <option value="ja">日本語</option>
            <option value="ar">العربية</option>
            <option value="hi">हिंदी</option>
            <option value="pt">Português</option>
            <option value="ru">Русский</option>
          </select>
        </div>
        
        <div class="search-box">
          <input type="text" id="helpSearch" placeholder="Search help..." data-i18n="help.search">
        </div>
        
        <div class="help-categories">
          <div class="category" data-category="navigation">
            <h4 data-i18n="help.navigation">Navigation</h4>
            <ul>
              <li><a href="#" data-help="browse-categories" data-i18n="help.browseCategories">Browse Categories</a></li>
              <li><a href="#" data-help="search-products" data-i18n="help.searchProducts">Search Products</a></li>
              <li><a href="#" data-help="use-filters" data-i18n="help.useFilters">Use Filters</a></li>
            </ul>
          </div>
          
          <div class="category" data-category="shopping">
            <h4 data-i18n="help.shopping">Shopping</h4>
            <ul>
              <li><a href="#" data-help="add-to-cart" data-i18n="help.addToCart">Add to Cart</a></li>
              <li><a href="#" data-help="checkout" data-i18n="help.checkout">Checkout Process</a></li>
              <li><a href="#" data-help="payment-methods" data-i18n="help.paymentMethods">Payment Methods</a></li>
            </ul>
          </div>
          
          <div class="category" data-category="account">
            <h4 data-i18n="help.account">Account</h4>
            <ul>
              <li><a href="#" data-help="create-account" data-i18n="help.createAccount">Create Account</a></li>
              <li><a href="#" data-help="track-orders" data-i18n="help.trackOrders">Track Orders</a></li>
              <li><a href="#" data-help="manage-profile" data-i18n="help.manageProfile">Manage Profile</a></li>
            </ul>
          </div>
          
          <div class="category" data-category="support">
            <h4 data-i18n="help.support">Support</h4>
            <ul>
              <li><a href="#" data-help="size-guide" data-i18n="help.sizeGuide">Size Guide</a></li>
              <li><a href="#" data-help="returns" data-i18n="help.returns">Returns & Exchanges</a></li>
              <li><a href="#" data-help="contact" data-i18n="help.contact">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div class="help-content" id="helpContent">
          <p data-i18n="help.selectTopic">Select a topic to get help</p>
        </div>
      </div>
    `;

        document.body.appendChild(container);
    }

    bindEvents() {
        const helpButton = document.getElementById('helpButton');
        const closeBtn = document.getElementById('closeBtn');
        const helpPanel = document.getElementById('helpPanel');
        const languageSelect = document.getElementById('languageSelect');
        const helpSearch = document.getElementById('helpSearch');

        helpButton.addEventListener('click', () => this.toggleHelp());
        closeBtn.addEventListener('click', () => this.closeHelp());
        languageSelect.addEventListener('change', (e) => this.changeLanguage(e.target.value));
        helpSearch.addEventListener('input', (e) => this.searchHelp(e.target.value));

        // Category clicks
        document.querySelectorAll('[data-help]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showHelpContent(e.target.dataset.help);
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!helpPanel.contains(e.target) && !helpButton.contains(e.target)) {
                this.closeHelp();
            }
        });
    }

    toggleHelp() {
        const helpPanel = document.getElementById('helpPanel');
        this.isOpen = !this.isOpen;

        if (this.isOpen) {
            helpPanel.classList.add('open');
            this.animateIn();
        } else {
            this.animateOut();
        }
    }

    closeHelp() {
        const helpPanel = document.getElementById('helpPanel');
        this.isOpen = false;
        this.animateOut();
    }

    animateIn() {
        const panel = document.getElementById('helpPanel');
        panel.style.transform = 'translateX(100%)';
        panel.style.opacity = '0';

        setTimeout(() => {
            panel.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
            panel.style.transform = 'translateX(0)';
            panel.style.opacity = '1';
        }, 10);
    }

    animateOut() {
        const panel = document.getElementById('helpPanel');
        panel.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
        panel.style.transform = 'translateX(100%)';
        panel.style.opacity = '0';

        setTimeout(() => {
            panel.classList.remove('open');
        }, 400);
    }

    changeLanguage(lang) {
        this.currentLanguage = lang;
        this.updateTranslations();
    }

    updateTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        const translations = this.translations[this.currentLanguage] || this.translations['en'];

        elements.forEach(element => {
            const key = element.dataset.i18n;
            const value = this.getNestedValue(translations, key);
            if (value) {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = value;
                } else {
                    element.textContent = value;
                }
            }
        });
    }

    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current && current[key], obj);
    }

    searchHelp(query) {
        const categories = document.querySelectorAll('.category');
        const searchTerm = query.toLowerCase();

        categories.forEach(category => {
            const links = category.querySelectorAll('a');
            let hasVisible = false;

            links.forEach(link => {
                const text = link.textContent.toLowerCase();
                if (text.includes(searchTerm) || searchTerm === '') {
                    link.style.display = 'block';
                    hasVisible = true;
                } else {
                    link.style.display = 'none';
                }
            });

            category.style.display = hasVisible ? 'block' : 'none';
        });
    }

    showHelpContent(topic) {
        const helpContent = document.getElementById('helpContent');
        const content = this.getHelpContent(topic);

        helpContent.innerHTML = `
      <div class="help-article">
        <h3>${content.title}</h3>
        <div class="help-steps">
          ${content.steps.map(step => `<p>${step}</p>`).join('')}
        </div>
        ${content.video ? `<div class="help-video"><iframe src="${content.video}" frameborder="0" allowfullscreen></iframe></div>` : ''}
        <button class="help-back-btn" onclick="helpWidget.showCategories()">← Back</button>
      </div>
    `;
    }

    getHelpContent(topic) {
        const content = {
            'browse-categories': {
                title: this.t('help.browseCategories'),
                steps: [
                    this.t('help.browseCategoriesStep1'),
                    this.t('help.browseCategoriesStep2'),
                    this.t('help.browseCategoriesStep3')
                ]
            },
            'search-products': {
                title: this.t('help.searchProducts'),
                steps: [
                    this.t('help.searchProductsStep1'),
                    this.t('help.searchProductsStep2'),
                    this.t('help.searchProductsStep3')
                ]
            },
            'add-to-cart': {
                title: this.t('help.addToCart'),
                steps: [
                    this.t('help.addToCartStep1'),
                    this.t('help.addToCartStep2'),
                    this.t('help.addToCartStep3')
                ]
            },
            'checkout': {
                title: this.t('help.checkout'),
                steps: [
                    this.t('help.checkoutStep1'),
                    this.t('help.checkoutStep2'),
                    this.t('help.checkoutStep3')
                ]
            },
            'payment-methods': {
                title: this.t('help.paymentMethods'),
                steps: [
                    this.t('help.paymentMethodsStep1'),
                    this.t('help.paymentMethodsStep2'),
                    this.t('help.paymentMethodsStep3')
                ]
            },
            'create-account': {
                title: this.t('help.createAccount'),
                steps: [
                    this.t('help.createAccountStep1'),
                    this.t('help.createAccountStep2'),
                    this.t('help.createAccountStep3')
                ]
            },
            'track-orders': {
                title: this.t('help.trackOrders'),
                steps: [
                    this.t('help.trackOrdersStep1'),
                    this.t('help.trackOrdersStep2'),
                    this.t('help.trackOrdersStep3')
                ]
            },
            'size-guide': {
                title: this.t('help.sizeGuide'),
                steps: [
                    this.t('help.sizeGuideStep1'),
                    this.t('help.sizeGuideStep2'),
                    this.t('help.sizeGuideStep3')
                ]
            },
            'returns': {
                title: this.t('help.returns'),
                steps: [
                    this.t('help.returnsStep1'),
                    this.t('help.returnsStep2'),
                    this.t('help.returnsStep3')
                ]
            },
            'contact': {
                title: this.t('help.contact'),
                steps: [
                    this.t('help.contactStep1'),
                    this.t('help.contactStep2'),
                    this.t('help.contactStep3')
                ]
            }
        };

        return content[topic] || {
            title: 'Help Topic',
            steps: ['Information not available']
        };
    }

    t(key) {
        const translations = this.translations[this.currentLanguage] || this.translations['en'];
        return this.getNestedValue(translations, key) || key;
    }

    showCategories() {
        const helpContent = document.getElementById('helpContent');
        helpContent.innerHTML = '<p data-i18n="help.selectTopic">Select a topic to get help</p>';
        this.updateTranslations();
    }
}

// Initialize help widget
let helpWidget;
document.addEventListener('DOMContentLoaded', () => {
    helpWidget = new HelpWidget();
});
