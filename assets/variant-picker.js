if (!customElements.get('variant-radios')) {
  customElements.define(
    'variant-radios',
    class VariantRadios extends HTMLElement {
      constructor() {
        super();
        this.addEventListener('change', this.onVariantChange.bind(this));
      }

      onVariantChange() {
        this.updateOptions();
        this.updateMasterId();
        this.toggleAddButton(true, '', false);
        this.updatePickupAvailability();
        this.removeErrorMessage();

        if (!this.currentVariant) {
          this.toggleAddButton(true, '', true);
          this.setUnavailable();
          return;
        }

        this.updateVariantInput();
        this.updateURL();
        this.renderProductInfo();
        this.updateShareUrl();
      }

      updateOptions() {
        this.options = Array.from(
          this.querySelectorAll('fieldset'),
          (fieldset) => {
            const checked = fieldset.querySelector('input:checked');
            return checked ? checked.value : null;
          }
        );
      }

      updateMasterId() {
        const variants = this.getVariantData();
        this.currentVariant = variants.find((variant) =>
          variant.options.every(
            (value, index) => this.options[index] === value
          )
        );
      }

      updateVariantInput() {
        const productForms = document.querySelectorAll(
          `#product-form-${this.dataset.section}, #product-form-installment-${this.dataset.section}`
        );
        productForms.forEach((productForm) => {
          const input = productForm.querySelector('input[name="id"]');
          if (input) {
            input.value = this.currentVariant.id;
            input.dispatchEvent(new Event('change', { bubbles: true }));
          }
        });
      }

      updateURL() {
        if (this.dataset.updateUrl === 'false') return;
        window.history.replaceState(
          {},
          '',
          `${this.dataset.url}?variant=${this.currentVariant.id}`
        );
      }

      renderProductInfo() {
        const sectionId =
          this.dataset.originalSection || this.dataset.section;

        fetch(
          `${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${sectionId}`
        )
          .then((response) => response.text())
          .then((responseText) => {
            const html = new DOMParser().parseFromString(
              responseText,
              'text/html'
            );

            const destination = document.getElementById(
              `price-${this.dataset.section}`
            );
            const source = html.getElementById(`price-${sectionId}`);
            if (source && destination) destination.innerHTML = source.innerHTML;

            const inventoryDestination = document.getElementById(
              `Inventory-${this.dataset.section}`
            );
            const inventorySource = html.getElementById(
              `Inventory-${sectionId}`
            );
            if (inventorySource && inventoryDestination) {
              inventoryDestination.innerHTML = inventorySource.innerHTML;
            }

            const skuDestination = document.getElementById(
              `Sku-${this.dataset.section}`
            );
            const skuSource = html.getElementById(`Sku-${sectionId}`);
            if (skuSource && skuDestination) {
              skuDestination.innerHTML = skuSource.innerHTML;
            }

            const addButton = document.getElementById(
              `ProductSubmitButton-${sectionId}`
            );
            const addButtonUpdated = html.getElementById(
              `ProductSubmitButton-${sectionId}`
            );
            if (addButton && addButtonUpdated) {
              addButton.innerHTML = addButtonUpdated.innerHTML;
            }

            this.toggleAddButton(
              !this.currentVariant.available,
              window.variantStrings.soldOut
            );

            if (this.currentVariant.featured_media) {
              const mediaGallery = document.getElementById(
                `MediaGallery-${this.dataset.section}`
              );
              if (mediaGallery) {
                mediaGallery.setActiveMedia(
                  `${this.dataset.section}-${this.currentVariant.featured_media.id}`,
                  true
                );
              }
            }

            publish(PUB_SUB_EVENTS.variantChange, {
              data: {
                sectionId,
                html,
                variant: this.currentVariant,
              },
            });
          });
      }

      toggleAddButton(disable = true, text, modifyClass = true) {
        const productForm = document.getElementById(
          `product-form-${this.dataset.section}`
        );
        if (!productForm) return;
        const addButton = productForm.querySelector('[name="add"]');
        const addButtonText = productForm.querySelector('[name="add"] > span');
        if (!addButton) return;

        if (disable) {
          addButton.setAttribute('disabled', 'disabled');
          if (text) addButtonText.textContent = text;
        } else {
          addButton.removeAttribute('disabled');
          addButtonText.textContent = window.variantStrings.addToCart;
        }

        if (!modifyClass) return;
      }

      setUnavailable() {
        const button = document.getElementById(
          `product-form-${this.dataset.section}`
        );
        const addButton = button
          ? button.querySelector('[name="add"]')
          : null;
        const addButtonText = button
          ? button.querySelector('[name="add"] > span')
          : null;
        const price = document.getElementById(
          `price-${this.dataset.section}`
        );

        if (addButton) {
          addButtonText.textContent = window.variantStrings.unavailable;
          addButton.setAttribute('disabled', 'disabled');
        }
        if (price) price.classList.add('visibility-hidden');
      }

      updatePickupAvailability() {
        const pickUpAvailability = document.querySelector('pickup-availability');
        if (!pickUpAvailability) return;

        if (this.currentVariant && this.currentVariant.available) {
          pickUpAvailability.fetchAvailability(this.currentVariant.id);
        } else {
          pickUpAvailability.removeAttribute('available');
          pickUpAvailability.innerHTML = '';
        }
      }

      removeErrorMessage() {
        const section = this.closest('section');
        if (!section) return;
        const productForm = section.querySelector('product-form');
        if (productForm) productForm.handleErrorMessage();
      }

      updateShareUrl() {
        const shareButton = document.getElementById(
          `Share-${this.dataset.section}`
        );
        if (!shareButton || !shareButton.updateUrl) return;
        shareButton.updateUrl(
          `${window.shopUrl}${this.dataset.url}?variant=${this.currentVariant.id}`
        );
      }

      getVariantData() {
        this.variantData =
          this.variantData ||
          JSON.parse(this.querySelector('[type="application/json"]').textContent);
        return this.variantData;
      }
    }
  );
}

if (!customElements.get('variant-selects')) {
  customElements.define(
    'variant-selects',
    class VariantSelects extends (customElements.get('variant-radios')
      .prototype.constructor) {
      constructor() {
        super();
      }

      updateOptions() {
        this.options = Array.from(
          this.querySelectorAll('select'),
          (select) => select.value
        );
      }
    }
  );
}
