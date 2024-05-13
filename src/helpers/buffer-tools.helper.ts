

export class BufferTools {

  constructor(
    private link: string
  ) { }

  private convertFromObjectToBase64 = async (blob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  convertToBufferFromURI = async () => {
    const response = new XMLHttpRequest();
    response.open('GET', this.link, true);
    response.responseType = 'blob';
    return new Promise((resolve, reject) => {
      response.onloadend = () => {
        this.convertFromObjectToBase64(response.response).then(resolve);
      };
      response.onerror = () => {
        // @ts-ignore
        reject(response.statusTeresponset);
      };
      response.send(null);
    });
  };

}
