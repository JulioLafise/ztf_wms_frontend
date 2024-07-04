import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import { Collections } from '@mui/icons-material';
import { v4 as uuid } from 'uuid';

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
  limitFile?: number,
  onLoadData?: (data: Array<FileData>) => void,
  onLoadFiles?: React.Dispatch<React.SetStateAction<File[]>>
}

type FileData = { id: string, file: string | ArrayBuffer };

const DragFileDialog: React.FC<IProps> = (props) => {
  const { type = 'images', limitFile = 1, onLoadData, onLoadFiles } = props;
  const apiRef = React.useRef<HTMLInputElement | null>(null);
  const [isDragActive, setIsDragActive] = React.useState<boolean>(false);
  const [loadData, setLoadData] = React.useState<Array<FileData>>([]);
  const [files, setFiles] = React.useState<File[]>([]);
  const numberFiles = React.useRef<number>(0);

  const getAcceptFile = (type: IProps['type']) => {
    switch (type) {
      case 'images':
        return 'image/*';

      case 'docs':
        return '.pdf,.docx,.pptx,.txt,.xlsx';

      case 'all':
        return '*';
    
      default:
        return 'image/*';
    }
  };

  const getSupportFiles = (type: IProps['type']) => {
    switch (type) {
      case 'images':
        return '.JPG, .PNG, .JPEEG';

      case 'docs':
        return '.PDF, .DOCX, .PPTX, .TXT, .XLSX';

      case 'all':
        return 'ALL FILES';
    
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
    const files = _e.target.files;
    if (files) {
      if (files.length) {
        numberFiles.current = files.length;
        onFiles(files);
      }
    }
  };

  const onEvent = (_e: React.DragEvent<HTMLDivElement>) => {
    _e.preventDefault();
    setIsDragActive(false);
    const files = _e.dataTransfer.files;
    if (files.length) {
      numberFiles.current = files.length;
      onFiles(files);
    }
  };

  const onFiles = (files: FileList) => {
    setLoadData([]);
    setFiles([]);
    for (const file of Array.from(files).slice(0, limitFile)) {
      // Initializing the FileReader API and reading the file
      const reader = new FileReader();
      reader.readAsDataURL(file);

      // Once the file has been loaded, fire the processing
      reader.onloadend = function (e) {
        if (isValidFileType(file)) {

          setFiles(prevState => [...prevState, file]);
          setLoadData(prevState => [...prevState, { id: uuid(), file: e.target!.result || '' }]);
        }
      };
    }
  };

  const isValidFileType = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    return allowedTypes.includes(file.type);
  };

  React.useEffect(() => {
    if (numberFiles.current === loadData.length) {
      onLoadData && onLoadData(loadData);
      onLoadFiles && onLoadFiles(files);
    }
  }, [loadData, files]);

  return (
    <Box component="div" className="flex flex-col gap-3">
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
          multiple={limitFile > 1}
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
      </Box>
      <Typography variant="body2" fontWeight="semibold" color="gray">Add up to {limitFile} {type} to your items.</Typography>
    </Box>
  );
};

export default DragFileDialog;