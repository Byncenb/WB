interface VirtualNode {
    tag: string;
    attrs?: Map<string, string>;
    children?: Array<VirtualNode | string>;
}

// Загружаем JSON-файл
async function fetchComponent(file: string): Promise<VirtualNode> {
    const response = await fetch(file);
    return await response.json();
}

function createElement(node: VirtualNode | string): HTMLElement | Text {
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }

    const element = document.createElement(node.tag);

    // Устанавливаем атрибуты, если они есть
    if (node.attrs instanceof Map) {
        node.attrs.forEach((value, key) => {
            element.setAttribute(key, value);
        });
    }

    // Рекурсивно добавляем детей
    if (node.children) {
        node.children.forEach((child) => {
            element.appendChild(createElement(child));
        });
    }

    return element;
}

// Основная функция для рендеринга
async function renderComponent(file: string, targetSelector: string): Promise<void> {
    const componentData: VirtualNode = await fetchComponent(file); // Загружаем JSON
    const rootElement: HTMLElement | Text = createElement(componentData);
    const target = document.querySelector(targetSelector);
    if (!target) return;
    target.appendChild(rootElement);
}

// Запускаем рендеринг
renderComponent('component.json', '#app');