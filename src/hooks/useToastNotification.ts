import React from 'react';
import toast, {
  type Renderable,
  type Toast,
  type ValueOrFunction
} from 'react-hot-toast';
import { useUI } from './';
import { ToastMessage, FontAwesomeIcon } from '@wms/components';

const darkModeStyle: React.CSSProperties = {
  borderRadius: '10px',
  background: '#333',
  color: '#fff',
};

type TypeOptionToast = {
  icon?: Renderable,
  duration?: number,
  mode?: 'dark' | 'light'
};

type FnToastComponent = (toast: Toast) => React.ReactElement;
type MsgPromise = {
  loading: Renderable;
  success: ValueOrFunction<Renderable, unknown>;
  error: ValueOrFunction<Renderable, any>;
}

const useToastNotification = () => {
  const { theme } = useUI();

  const getTheme = (mode?: 'dark' | 'light') => {
    if (mode) {
      return mode === 'dark' ? darkModeStyle : undefined;
    }
    return theme.isDarkMode ? darkModeStyle : undefined;
  };

  const toastSuccess = (message: string, options?: TypeOptionToast) => {
    return toast.success(message, {
      position: 'bottom-right',
      duration: options?.duration,
      style: getTheme(options?.mode),
      icon: options?.icon,
      iconTheme: {
        primary: theme.paletteColors?.primary.main || '',
        secondary: theme.paletteColors?.secondary.main || '',
      }
    });
  };

  const toastInfo = (message: string, options?: TypeOptionToast) => {
    return toast.success(message, {
      position: 'bottom-right',
      duration: options?.duration,
      style: getTheme(options?.mode),
      icon: options?.icon || FontAwesomeIcon({ icon: 'info-circle', color: '#0275d8', size: 'lg', beatFade: true }),
      iconTheme: {
        primary: theme.paletteColors?.primary.main || '',
        secondary: theme.paletteColors?.secondary.main || '',
      }
    });
  };

  const toastError = (message: string, options?: TypeOptionToast) => {
    return toast.error(message, {
      position: 'bottom-right',
      duration: options?.duration,
      style: getTheme(options?.mode),
      icon: options?.icon,
      iconTheme: {
        primary: theme.paletteColors?.primary.main || '',
        secondary: theme.paletteColors?.secondary.main || '',
      }
    });
  };

  const toastPromise = (callback: Promise<unknown>, msg: MsgPromise, options?: TypeOptionToast) => {
    return toast.promise(callback, msg, {
      position: 'bottom-right',
      duration: options?.duration,
      style: getTheme(options?.mode),
      icon: options?.icon,
      iconTheme: {
        primary: theme.paletteColors?.primary.main || '',
        secondary: theme.paletteColors?.secondary.main || '',
      }
    });
  };

  const toastComponent = (callback: FnToastComponent, options?: TypeOptionToast) => toast((t) => callback(t), {
    position: 'bottom-right',
    duration: options?.duration,
    style: getTheme(options?.mode),
    icon: options?.icon,
    iconTheme: {
      primary: theme.paletteColors?.primary.main || '',
      secondary: theme.paletteColors?.secondary.main || '',
    }
  });

  const toastMessage = (title: string, message: string, options?: TypeOptionToast) => {
    return toast.custom((t) => ToastMessage({ toast: t, title, message }),
      {
        position: 'bottom-right',
        duration: options?.duration,
        style: getTheme(options?.mode),
        icon: options?.icon,
        iconTheme: {
          primary: theme.paletteColors?.primary.main || '',
          secondary: theme.paletteColors?.secondary.main || '',
        }
      }
    );
  };

  return {
    // METHODS
    toastSuccess,
    toastInfo,
    toastError,
    toastPromise,
    toastComponent,
    toastMessage
  };
};

export default useToastNotification;