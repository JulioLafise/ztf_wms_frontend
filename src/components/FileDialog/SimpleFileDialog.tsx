import React from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  styled,
  CircularProgress
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { FileUpload } from '@mui/icons-material'
import { FilesContent } from '@wms/interfaces';
import { IconButtonBg } from '@wms/components';
import { useAlertNotification } from '@wms/hooks';


interface IProps {
 iconButton?: boolean,
 limitFile?: number,
 acceptFile?: string,
 sizeBtn?: 'small' | 'medium' | 'large',
 onContentFiles?: React.Dispatch<React.SetStateAction<FilesContent | undefined>>,
 onLoadFiles?: (files: FilesContent) => void,
 isLoading?: boolean,
 disabled?: boolean,
}

const VisuallyHiddenInputFile = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const SimpleFileDialog = (props: IProps) => {
  const {
    iconButton,
    limitFile = 1,
    acceptFile = 'image/*',
    sizeBtn = 'medium',
    onContentFiles,
    onLoadFiles,
    isLoading,
    disabled
  } = props;

  const { swalToastError } = useAlertNotification();

  const apiRef = React.useRef<HTMLInputElement | null>(null);

  const onClick = () => { apiRef.current?.click(); };

  const onUploadFile = (_e: React.ChangeEvent<HTMLInputElement>) => {
    if (_e.target.files) {
      let items: FilesContent = [];
      Object.entries(_e.target.files).forEach((item) => {
        const content = URL.createObjectURL(item['1']);
        items = [
          ...items,
          {
            files: item['1'],
            content
          }
        ];
      });
      if (items.length > limitFile) {
        // files = files.slice(0, limitFile);
        swalToastError('Error', {
          message: `The maximum file limit of ${limitFile} has been exceeded)`,
          timer: 2000
        });
        return;
      }
      onContentFiles && onContentFiles(items);
      onLoadFiles && onLoadFiles(items);
    }
  };

  return (
    <Box component="section" className="flex items-center justify-center">
      {
        iconButton
          ? (
            <Tooltip title="Upload File">
              <IconButtonBg
                color="inherit"
                edge="end"
                size={sizeBtn}
                role={undefined}
                tabIndex={-1}
                onClick={onClick}
                disabled={isLoading || disabled}
              >
                {isLoading ? <CircularProgress /> : <FileUpload fontSize="inherit" />}
                <VisuallyHiddenInputFile
                  ref={apiRef}
                  id="file-045d"
                  multiple={limitFile > 1}
                  type="file"
                  onChange={onUploadFile}
                  accept={acceptFile}
                />
              </IconButtonBg>
            </Tooltip>
          )
          : (
            <LoadingButton
              variant="contained"
              role={undefined}
              tabIndex={-1}
              startIcon={<FileUpload />}
              size={sizeBtn}
              loading={isLoading}
              onClick={onClick}
              disabled={disabled}
            >
              Upload File
              <VisuallyHiddenInputFile
                ref={apiRef}
                id="file-045d"
                multiple={limitFile > 1}
                type="file"
                onChange={onUploadFile}
                accept={acceptFile}
              />
            </LoadingButton>
          )
      }
    </Box>
  );
};

export default SimpleFileDialog;