const Keyboard = {
  elements: {
    keysContainer: null,
    keys: [],
  },
  eventHandlers: {
    oninput: null,
  },
  properties: {
    value: '',
    capsLock: false,
    lang: '',
  },
  layouts: {
    en: {
      nocaps: [
        '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
        'Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
        'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '.', ',', '/', '\u2191', 'Shift',
        'Ctrl', 'Win', 'Alt', ' ', 'Alt', '\u2190', '\u2193', '\u2192', 'Ctrl',
      ],
      caps: [
        '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace',
        'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del',
        'Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '"', 'Enter',
        'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '\u2191', 'Shift',
        'Ctrl', 'Win', 'Alt', ' ', 'Alt', '\u2190', '\u2193', '\u2192', 'Ctrl',
      ],
    },
    ru: {
      nocaps: [
        'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del',
        'Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
        'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '/', '\u2191', 'Shift',
        'Ctrl', 'Win', 'Alt', ' ', 'Alt', '\u2190', '\u2193', '\u2192', 'Ctrl',
      ],
      caps: [
        'Ё', '!', '"', '№', '%', ':', ',', '.', ';', '(', ')', '_', '+', 'Backspace',
        'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '|', 'Del',
        'Caps Lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter',
        'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '?', '\u2191', 'Shift',
        'Ctrl', 'Win', 'Alt', ' ', 'Alt', '\u2190', '\u2193', '\u2192', 'Ctrl',
      ],
    },
  },
  hardKeys: [
    'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
    'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
    'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
    'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
    'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight',
  ],
  init(wrp, out) {
    const outputElement = out;
    this.elements.keysContainer = document.createElement('div');
    this.elements.keysContainer.classList.add('keyboard');
    wrp.appendChild(this.elements.keysContainer);
    const curLang = window.sessionStorage.getItem('lang');
    this.properties.lang = (curLang == null) ? 'en' : curLang;
    this.eventHandlers.oninput = (curValue) => {
      outputElement.value = curValue;
    };
    this.createKeys();
    this.setKeys(this.layouts[this.properties.lang].nocaps);
    this.elements.keysContainer.addEventListener('kbd', (event) => {
      const z = this.hardKeys.indexOf(event.detail.code);
      const key = this.elements.keys[z];
      const caps = this.properties.capsLock ? 'caps' : 'nocaps';
      const keyName = this.layouts[this.properties.lang][caps][z];
      if (keyName !== 'Caps Lock') { key.classList.add('keyboard--key-active'); }
      switch (keyName) {
        case 'Backspace':
          this.properties.value = this.properties.value.slice(0, -1);
          break;
        case 'Enter':
          this.properties.value += '\n';
          break;
        case 'Caps Lock':
          key.classList.toggle('keyboard--key-active');
          this.toggleCapsLock();
          break;
        case 'Shift':
          this.toggleCapsLock();
          break;
        case 'Del':
          this.properties.value = this.properties.value.slice(1);
          break;
        case 'Tab':
          this.properties.value += '\t';
          break;
        case 'Ctrl':
          if (event.detail.alt) { this.switchLang(); }
          break;
        case 'Alt':
          if (event.detail.ctrl) { this.switchLang(); }
          break;
        case 'Win':
          break;
        default:
          this.properties.value += keyName;
          break;
      }
      this.triggerEvent('oninput');
    });

    this.elements.keysContainer.addEventListener('kbdUp', (event) => {
      const z = this.hardKeys.indexOf(event.detail.code);
      const key = this.elements.keys[z];
      const caps = this.properties.capsLock ? 'caps' : 'nocaps';
      const keyName = this.layouts[this.properties.lang][caps][z];
      if (keyName !== 'Caps Lock') { setTimeout(() => { key.classList.remove('keyboard--key-active'); }, 100); }
      if (keyName === 'Shift') { this.toggleCapsLock(); }
    });
    this.elements.keysContainer.addEventListener('click', (event) => {
      if (event.target !== this.elements.keysContainer) {
        const key = event.target;
        const index = this.elements.keys.indexOf(key);
        const caps = this.properties.capsLock ? 'caps' : 'nocaps';
        const keyName = this.layouts[this.properties.lang][caps][index];
        if (keyName !== 'Caps Lock') { key.classList.add('keyboard--key-active'); }
        switch (keyName) {
          case 'Backspace':
            this.properties.value = this.properties.value.slice(0, -1);
            break;
          case 'Enter':
            this.properties.value += '\n';
            break;
          case 'Caps Lock':
            key.classList.toggle('keyboard--key-active');
            this.toggleCapsLock();
            break;
          case 'Shift':
            break;
          case 'Del':
            this.properties.value = this.properties.value.slice(1);
            break;
          case 'Tab':
            this.properties.value += '\t';
            break;
          case 'Ctrl':
            break;
          case 'Alt':
            break;
          case 'Win':
            break;
          default:
            this.properties.value += keyName;
            break;
        }
        if (keyName !== 'Caps Lock') { setTimeout(() => { key.classList.remove('keyboard--key-active'); }, 300); }
        this.triggerEvent('oninput');
      }
    });
  },

  createKeys() {
    this.hardKeys.forEach((keyName) => {
      const key = document.createElement('div');
      key.classList.add('keyboard--key');
      this.elements.keys.push(key);
      switch (keyName) {
        case 'Backspace':
          key.classList.add('keyboard--key-wide100');
          break;
        case 'Enter':
          key.classList.add('keyboard--key-wide');
          break;
        case 'CapsLock':
          key.classList.add('keyboard--key-wide100');
          break;
        case 'ShiftLeft':
          key.classList.add('keyboard--key-wide100');
          break;
        case 'ShiftRight':
          key.classList.add('keyboard--key-wide');
          break;
        case 'Delete':
          key.classList.add('keyboard--key-wider');
          break;
        case 'Tab':
          key.classList.add('keyboard--key-wider');
          break;
        case 'ControlLeft':
          break;
        case 'ControlRight':
          break;
        case 'Space':
          key.classList.add('keyboard--key-widest');
          break;
        case 'AltLeft':
          break;
        case 'AltRight':
          break;
        case 'ArrowLeft':
          break;
        case 'ArrowRight':
          break;
        case 'ArrowUp':
          break;
        case 'ArrowDown':
          break;
        case 'MetaLeft':
          break;
        default:
          key.classList.add('keyboard--key-forCaps');
          break;
      }
      this.elements.keysContainer.appendChild(key);
    });
  },

  triggerEvent(name) {
    this.eventHandlers[name](this.properties.value);
  },

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
    const currentLayout = this.properties.capsLock ? this.layouts[this.properties.lang].caps
      : this.layouts[this.properties.lang].nocaps;
    this.setKeys(currentLayout);
  },

  switchLang() {
    if (this.properties.lang === 'en') {
      this.properties.lang = 'ru';
      window.sessionStorage.setItem('lang', 'ru');
    } else {
      this.properties.lang = 'en';
      window.sessionStorage.setItem('lang', 'en');
    }
    const currentLayout = this.properties.capsLock ? this.layouts[this.properties.lang].caps
      : this.layouts[this.properties.lang].nocaps;
    this.setKeys(currentLayout);
  },
  setKeys(layout) {
    let i = 0;
    this.elements.keys.forEach((keyParameter) => {
      const keyName = layout[i];
      const key = keyParameter;
      i += 1;
      switch (keyName) {
        case 'ArrowLeft':
          key.textContent = '<';
          break;
        case 'ArrowRight':
          key.textContent = '>';
          break;
        case 'ArrowUp':
          key.textContent = '/';
          break;
        case 'ArrowDown':
          key.textContent = '/';
          break;
        default:
          key.textContent = keyName;
          break;
      }
    });
  },
};
window.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.createElement('div');
  const inputArea = document.createElement('textarea');
  wrapper.classList.add('wrapper');
  inputArea.classList.add('input_area');
  inputArea.setAttribute('rows', 6);
  inputArea.setAttribute('cols', 60);
  document.body.appendChild(wrapper);
  wrapper.appendChild(inputArea);
  Keyboard.init(wrapper, inputArea);
  document.addEventListener('keydown', (event) => {
    document.querySelector('.keyboard').dispatchEvent(new CustomEvent('kbd', {
      detail: {
        code: event.code, alt: event.altKey, shift: event.shiftKey, ctrl: event.ctrlKey,
      },
    }));
    event.preventDefault();
  });
  document.addEventListener('keyup', (event) => {
    document.querySelector('.keyboard').dispatchEvent(new CustomEvent('kbdUp', {
      detail: {
        code: event.code, alt: event.altKey, shift: event.shiftKey, ctrl: event.ctrlKey,
      },
    }));
    event.preventDefault();
  });
});
