import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
}

interface PDFUploaderProps {
  onFilesProcessed: (files: UploadedFile[]) => void;
}

export const PDFUploader = ({ onFilesProcessed }: PDFUploaderProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const processFile = async (file: File) => {
    const fileId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    
    const newFile: UploadedFile = {
      id: fileId,
      file,
      name: file.name,
      size: formatFileSize(file.size),
      status: 'uploading',
      progress: 0
    };

    setUploadedFiles(prev => [...prev, newFile]);

    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setUploadedFiles(prev => 
        prev.map(f => f.id === fileId ? { ...f, progress } : f)
      );
    }

    // Simulate processing
    setUploadedFiles(prev => 
      prev.map(f => f.id === fileId ? { ...f, status: 'processing', progress: 0 } : f)
    );

    // Simulate processing progress
    for (let progress = 0; progress <= 100; progress += 20) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setUploadedFiles(prev => 
        prev.map(f => f.id === fileId ? { ...f, progress } : f)
      );
    }

    // Complete processing
    setUploadedFiles(prev => 
      prev.map(f => f.id === fileId ? { ...f, status: 'completed', progress: 100 } : f)
    );
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      await processFile(file);
    }
    
    // Notify parent component
    const completedFiles = uploadedFiles.filter(f => f.status === 'completed');
    onFilesProcessed(completedFiles);
  }, [uploadedFiles, onFilesProcessed]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: true
  });

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const getStatusIcon = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading':
      case 'processing':
        return <Loader2 className="w-4 h-4 animate-spin text-primary" />;
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
    }
  };

  const getStatusText = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading':
        return 'Uploading...';
      case 'processing':
        return 'Processing PDF...';
      case 'completed':
        return 'Ready for Q&A';
      case 'error':
        return 'Error occurred';
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="overflow-hidden">
          <div
            {...getRootProps()}
            className={`p-12 text-center border-2 border-dashed transition-all duration-300 cursor-pointer ${
              isDragActive 
                ? 'border-primary bg-primary/5 scale-[1.02]' 
                : 'border-border hover:border-primary/50 hover:bg-primary/5'
            }`}
          >
            <input {...getInputProps()} />
            
            <motion.div
              animate={{ 
                scale: isDragActive ? 1.1 : 1,
                rotate: isDragActive ? 5 : 0 
              }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center justify-center space-y-4"
            >
              <div className="w-16 h-16 ai-gradient rounded-2xl flex items-center justify-center">
                <Upload className="w-8 h-8 text-white" />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {isDragActive ? 'Drop your PDFs here!' : 'Upload your study materials'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop PDF files or click to browse
                </p>
                <Button variant="outline" size="lg">
                  Choose Files
                </Button>
              </div>
            </motion.div>
          </div>
        </Card>
      </motion.div>

      {/* Uploaded Files */}
      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Uploaded Documents ({uploadedFiles.length})
            </h3>
            
            {uploadedFiles.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-card border border-border rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{file.name}</h4>
                      <p className="text-xs text-muted-foreground">{file.size}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      {getStatusIcon(file.status)}
                      <span className="text-muted-foreground">
                        {getStatusText(file.status)}
                      </span>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(file.id)}
                      className="h-8 w-8"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {(file.status === 'uploading' || file.status === 'processing') && (
                  <Progress value={file.progress} className="h-2" />
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};