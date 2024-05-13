
interface ILocalStorage {
  darkMode: boolean,
  navPath: string,
  auth: {
    token: string,
    username: string | null,
    refreshToken: string | null,
    accessToken: string | null,
    expire: number
  }
}

type Types = 'string' | 'boolean' | 'object' | 'number';
type TypeValue<T> = { [key in keyof T]: true };

type TypeStorageListener = (this: Window, ev: StorageEvent) => any;

export class LocalStorageConfig {

  private static refreshStorage() {
    window.dispatchEvent(new Event('storage'));
  }

  static getItem<T>(nameId: string, type: Types, defaultValue?: T | undefined): T {
    let value;
    switch (type) {
      case 'boolean':
        value = Boolean((/true/).test(localStorage.getItem(nameId)?.toLowerCase() || '') || defaultValue);
        break;

      case 'number':
        value = Number(localStorage.getItem(nameId) || defaultValue);
        break;

      case 'object':
        value = JSON.parse(localStorage.getItem(nameId) || '') || defaultValue;
        break;

      default:
        value = localStorage.getItem(nameId) || defaultValue;
        break;
    }
    return value as T;
  }

  static getItems(): ILocalStorage {
    this.refreshStorage();
    return {
      darkMode: this.getItem<boolean>('dark-mode', 'boolean', false),
      navPath: this.getItem<string>('nav-path', 'string', ''),
      auth: {
        token: this.getItem<string>('token', 'string', '' ),
        username: this.getItem<string>('sid', 'string', undefined),
        refreshToken: this.getItem<string>('rftk', 'string', ''),
        accessToken: this.getItem<string>('acstk', 'string', ''),
        expire: this.getItem<number>('expire', 'number', 0),
      },
    };
  }

  static setItem<T>(nameId: string, values: T): boolean {
    try {
      let newValues;
      switch (typeof values) {
        case 'object':
          newValues = JSON.stringify(values);
          break;

        default:
          newValues = values as string;
          break;
      }
      localStorage.setItem(nameId, newValues);
      this.refreshStorage();
      return true;
    } catch (error) {
      return false;
    }
  }

  static removeItem(nameId: string): boolean {
    try {
      localStorage.removeItem(nameId);
      this.refreshStorage();
      return true;
    } catch (error) {
      return false;
    }
  }

  static removeItems(namesId: string[]): boolean {
    try {
      namesId.forEach(nameId => localStorage.removeItem(nameId));
      this.refreshStorage();
      return true;
    } catch (error) {
      return false;
    }
  }

  static localStorageMount(callback: TypeStorageListener) {
    window.addEventListener('storage', callback);
  }

  static localStorageUnmount(callback: TypeStorageListener) {
    window.removeEventListener('storage', callback);
  }

}
