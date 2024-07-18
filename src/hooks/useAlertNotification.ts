import Swal, { type SweetAlertOptions } from 'sweetalert2';
import { useUI } from './';

interface SwalOptions {
  message?: SweetAlertOptions['text'],
  allowEnterKey?: SweetAlertOptions['allowEnterKey'],
  allowOutsideClick?: SweetAlertOptions['allowOutsideClick'],
  allowEscapeKey?: SweetAlertOptions['allowEscapeKey'],
  showConfirmButton?: SweetAlertOptions['showConfirmButton'],
  confirmButtonText?: SweetAlertOptions['confirmButtonText'],
  cancelButtonText?: SweetAlertOptions['cancelButtonText'],  
  timer?: SweetAlertOptions['timer'],
  showLoading?: boolean,
}

interface SwalToastOptions {
  message?: SweetAlertOptions['text'],
  showConfirmButton?: SweetAlertOptions['showConfirmButton'],
  showCancelButton?: SweetAlertOptions['showCancelButton'],
  confirmButtonText?: SweetAlertOptions['confirmButtonText'],
  cancelButtonText?: SweetAlertOptions['cancelButtonText'],  
  timer?: SweetAlertOptions['timer'],
  showLoading?: boolean,
  input?: SweetAlertOptions['input'],
  inputValue?: SweetAlertOptions['inputValue'],
}

const darkModeStyle: React.CSSProperties = {
  borderRadius: '10px',
  background: '#333',
  color: '#fff',  
};

const useAlertNotification = () => {
  const { theme } = useUI();

  const swalToastSuccess = async <T,>(title: string, option?: SwalToastOptions) => {
    return Swal.fire<T>({
      title,
      text: option?.message,
      icon: 'success',
      animation: false,
      timer: option?.timer,
      input: option?.input,
      inputValue: option?.inputValue,    
      confirmButtonText: option?.confirmButtonText,
      showConfirmButton: option?.showConfirmButton,
      confirmButtonColor: theme.paletteColors?.primary.main,      
      cancelButtonText: option?.cancelButtonText,
      showCancelButton: option?.showCancelButton,
      background: theme.isDarkMode ? darkModeStyle.background?.toString() : '',
      color: theme.isDarkMode ? darkModeStyle.color?.toString() : '',
      toast: true,
      willOpen: () => {
        option?.showLoading && Swal.showLoading();
      }
    });
  };

  const swalToastInfo = async <T,>(title: string, option?: SwalToastOptions) => {
    return Swal.fire<T>({
      title,
      text: option?.message,
      icon: 'info',
      animation: false,
      timer: option?.timer,  
      input: option?.input,
      inputValue: option?.inputValue,      
      confirmButtonText: option?.confirmButtonText,
      showConfirmButton: option?.showConfirmButton,
      confirmButtonColor: theme.paletteColors?.primary.main,  
      cancelButtonText: option?.cancelButtonText,
      showCancelButton: option?.showCancelButton,
      background: theme.isDarkMode ? darkModeStyle.background?.toString() : '',
      color: theme.isDarkMode ? darkModeStyle.color?.toString() : '',
      toast: true,
      willOpen: () => {
        option?.showLoading && Swal.showLoading();
      }
    });
  };

  const swalToastError = async <T,>(title: string, option?: SwalToastOptions) => {
    return Swal.fire<T>({
      title,
      text: option?.message,
      icon: 'error',
      animation: false,
      timer: option?.timer, 
      input: option?.input,
      inputValue: option?.inputValue,       
      confirmButtonText: option?.confirmButtonText,
      showConfirmButton: option?.showConfirmButton,
      confirmButtonColor: theme.paletteColors?.primary.main,  
      cancelButtonText: option?.cancelButtonText,
      showCancelButton: option?.showCancelButton,
      background: theme.isDarkMode ? darkModeStyle.background?.toString() : '',
      color: theme.isDarkMode ? darkModeStyle.color?.toString() : '',
      toast: true,
      willOpen: () => {
        option?.showLoading && Swal.showLoading();
      }
    });
  };

  const swalToastWarn = async <T,>(title: string, option?: SwalToastOptions) => {
    return Swal.fire<T>({
      title,
      text: option?.message,
      icon: 'warning',
      animation: false,
      timer: option?.timer,
      input: option?.input,
      inputValue: option?.inputValue,        
      confirmButtonText: option?.confirmButtonText,
      showConfirmButton: option?.showConfirmButton,
      confirmButtonColor: theme.paletteColors?.primary.main,  
      cancelButtonText: option?.cancelButtonText,
      showCancelButton: option?.showCancelButton,
      background: theme.isDarkMode ? darkModeStyle.background?.toString() : '',
      color: theme.isDarkMode ? darkModeStyle.color?.toString() : '',
      toast: true,
      willOpen: () => {
        option?.showLoading && Swal.showLoading();
      }
    });
  };

  const swalToastWait = async <T,>(title: string, option?: SwalToastOptions) => {
    return Swal.fire<T>({
      title,
      text: option?.message,
      animation: false,
      timer: option?.timer,
      input: option?.input,
      inputValue: option?.inputValue,  
      confirmButtonText: option?.confirmButtonText,
      showConfirmButton: option?.showConfirmButton,
      confirmButtonColor: theme.paletteColors?.primary.main,  
      cancelButtonText: option?.cancelButtonText,
      showCancelButton: option?.showCancelButton,
      background: theme.isDarkMode ? darkModeStyle.background?.toString() : '',
      color: theme.isDarkMode ? darkModeStyle.color?.toString() : '',
      toast: true,
      willOpen: () => {
        option?.showLoading && Swal.showLoading();
      }
    });
  };

  const swalToastQuestion = async <T,>(title: string, option?: SwalToastOptions) => {
    return Swal.fire<T>({
      title,
      text: option?.message,
      animation: false,
      icon: 'question',
      timer: option?.timer,
      input: option?.input,
      inputValue: option?.inputValue,  
      confirmButtonText: option?.confirmButtonText,
      showConfirmButton: option?.showConfirmButton,
      confirmButtonColor: theme.paletteColors?.primary.main,  
      showCancelButton: option?.showCancelButton,
      cancelButtonText: option?.cancelButtonText,
      background: theme.isDarkMode ? darkModeStyle.background?.toString() : '',
      color: theme.isDarkMode ? darkModeStyle.color?.toString() : '',
      toast: true,
      willOpen: () => {
        option?.showLoading && Swal.showLoading();
      }
    });
  };

  return {
    //METHODS
    swalToastSuccess,
    swalToastInfo,
    swalToastError,
    swalToastWarn,
    swalToastWait,
    swalToastQuestion
  };

};

export default useAlertNotification;