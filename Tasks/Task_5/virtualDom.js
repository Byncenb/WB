"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Загружаем JSON-файл
function fetchComponent(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(file);
        return yield response.json();
    });
}
function createElement(node) {
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
function renderComponent(file, targetSelector) {
    return __awaiter(this, void 0, void 0, function* () {
        const componentData = yield fetchComponent(file); // Загружаем JSON
        const rootElement = createElement(componentData);
        const target = document.querySelector(targetSelector);
        if (!target)
            return;
        target.appendChild(rootElement);
    });
}
// Запускаем рендеринг
renderComponent('component.json', '#app');
