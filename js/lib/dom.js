export function createElement(tag, props, ...children) {
    const element = document.createElement(tag);

    if (props) {
        Object.entries(props).forEach(([key, value]) => {
            if (key.startsWith('on') && typeof value === 'function') {
                element.addEventListener(key.substring(2), value);
            } else if (key.startsWith('data-')) {
                element.setAttribute(key, value);
            } else {
                element[key] = value;
            }
        });
    }
    
    children.forEach(child => {
        if (typeof child === 'string') {
            child = document.createTextNode(child);
        }
        
        element.appendChild(child);
    });

    return element;
}