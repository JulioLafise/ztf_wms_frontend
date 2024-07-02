import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import { Collections } from '@mui/icons-material';

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

interface IProps {
  type?: 'images' | 'docs' | 'all',
  isMultiple?: boolean,
  onLoadData?: (data: Array<string | ArrayBuffer | null>) => void
}

const DragFileDialog: React.FC<IProps> = (props) => {
  const { type = 'images', isMultiple, onLoadData } = props;
  const apiRef = React.useRef<HTMLInputElement | null>(null);
  const [isDragActive, setIsDragActive] = React.useState<boolean>(false);
  const [loadData, setLoadData] = React.useState<Array<string | ArrayBuffer | null>>([]);

  const getAcceptFile = (type: IProps['type']) => {
    switch (type) {
      case 'images':
        return 'image/*';
    
      default:
        return 'image/*';
    }
  };

  const getSupportFiles = (type: IProps['type']) => {
    switch (type) {
      case 'images':
        return '.JPG, .PNG, .JPEEG';
    
      default:
        return '.JPG, .PNG, .JPEEG';
    }
  };

  const onClick = () => { apiRef.current?.click(); };

  const onDragActive = (active: boolean) => (_e: any) => {
    _e.preventDefault();
    setIsDragActive(active);
  };

  const onUploadFile = (_e: React.ChangeEvent<HTMLInputElement>) => {

  };

  const onEvent = (_e: React.DragEvent<HTMLDivElement>) => {
    _e.preventDefault();
    setIsDragActive(false);
    const files = _e.dataTransfer.files;
    if (files.length) {
      console.log(_e.dataTransfer.files);
      onFiles(files);
    }
  };

  const onFiles = (files: FileList) => {
    setLoadData([]);
    for (const file of files) {
      // Initializing the FileReader API and reading the file
      const reader = new FileReader();
      reader.readAsDataURL(file);

      // Once the file has been loaded, fire the processing
      reader.onloadend = function (e) {
        if (isValidFileType(file)) {
          setLoadData(prevState => [...prevState, e.target!.result]);
        }

      };
    }
    onLoadData && onLoadData(loadData);
  };

  const isValidFileType = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    return allowedTypes.includes(file.type);
  };

  return (
    <Box
      component="div"
      className={`p-20 border border-dashed rounded-lg flex flex-col items-center justify-center gap-1 cursor-pointer ${isDragActive ? 'bg-gray-300' : ''}`}
      onDragOver={onDragActive(true)}
      onDragLeave={onDragActive(false)}
      onDrop={onEvent}
    >
      <VisuallyHiddenInputFile
        ref={apiRef}
        id="file-047d"
        multiple={isMultiple}
        type="file"
        hidden
        onChange={onUploadFile}
        accept={getAcceptFile(type)}
      />
      <Collections fontSize="large" color="primary" />
      {
        isDragActive
          ? (<Typography variant="body1">Drop the files here ...</Typography>)
          : (
            <React.Fragment>
              <Typography
                variant="body1">
                Drop your files here or <Typography component="a" variant="body1" fontWeight="bold" className="underline hover:text-purple-950" onClick={onClick}>browse</Typography>
              </Typography>
              <Typography variant="subtitle2" color="gray">
                {getSupportFiles(type)}
              </Typography>
            </React.Fragment>
          )
      }
    </Box >
  );
};

export default DragFileDialog;