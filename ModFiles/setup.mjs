export async function setup({ onInterfaceReady }) {
    onInterfaceReady(ctx => {
        // Use a MutationObserver to detect when the shop page is displayed
        observeShopPage();
    });
}

function observeShopPage() {
    const observer = new MutationObserver(() => {
        const storeContainer = document.querySelector('#shop-container');
        if (storeContainer && !document.querySelector('#storeTextBox')) {
            addTextBoxToStore(storeContainer);
        }
    });

    // Observe the root element or a parent node that wraps the shop content
    observer.observe(document.body, { childList: true, subtree: true });
}

function addTextBoxToStore(storeContainer) {
    const textBox = document.createElement('input');
    textBox.type = 'text';
    textBox.placeholder = 'Enter value';
    textBox.id = 'storeTextBox';
    textBox.classList.add('store-textbox');
    
    storeContainer.appendChild(textBox);
}
