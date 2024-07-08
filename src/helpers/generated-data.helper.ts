/* eslint-disable prefer-spread */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-constant-condition */

export class GeneratedData {

  private static _pattern: RegExp = /[a-zA-Z0-9_\-\\+\\.$#@$*@%]/;

  private static _getRandomByte() {
    if (window.crypto && window.crypto.getRandomValues) {
      const result = new Uint8Array(1);
      window.crypto.getRandomValues(result);
      return result[0];
    }
    return Math.floor(Math.random() * 256);
  }

  private static _validatePassword(password: string) {
    let newPassword = password;
    while (!newPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{1,})/)?.filter(ft => ft)) {
      newPassword = this.password();
    }
    return newPassword;
  }

  static password(length: number = 12) {
    // @ts-expect-error
    return this._validatePassword(Array.apply(null, { 'length': length })
      .map(() => {
        let result;
        while (true) {
          result = String.fromCharCode(this._getRandomByte());
          if (this._pattern.test(result)) {
            return result;
          }
        }
      }, this)
      .join(''));  
  }

  static getRandomInt(max = 10) {
    return Math.floor(Math.random() * max);
  }

}