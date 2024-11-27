export async function setup({ onInterfaceReady }) {
    onInterfaceReady(async (ctx) => {
        observeShopPage();
    });
}

function observeShopPage() {
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            const shopContainer = document.querySelector("#horizontal-navigation-shop");
            if (shopContainer) {
                if (!document.querySelector("#custom-textbox")) {
                    addTextBox("custom-textbox", filterShopItems, {
                        label: "",
                        hint: "Type to filter shop items",
                    });
                }
                break;
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

function addTextBox(name, onChange, config) {
    const input = document.createElement("input");
    input.id = name;
    input.type = "text";
    input.name = name;
    input.classList.add("form-control");
    input.placeholder = config.hint || "";
    input.addEventListener("input", onChange);

    const label = document.createElement("label");
    label.htmlFor = name;
    label.textContent = config.label;

    const shopContainer = document.querySelector("#horizontal-navigation-shop");
    const referenceElement = shopContainer.firstChild;

    shopContainer.insertBefore(label, referenceElement);
    shopContainer.insertBefore(input, referenceElement);

    return shopContainer;
}

function filterShopItems(event) {
    const filterText = event.target.value.toLowerCase();
    let shopItems = document.querySelectorAll(
        "#shop-container .row.gutters-tiny.row-deck .col-12.col-lg-6.col-xl-4.p-2"
    );

    shopItems.forEach((item) => {
        const itemName = item.querySelector(".font-w600").textContent.toLowerCase();
        if (itemName.includes(filterText)) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });
}