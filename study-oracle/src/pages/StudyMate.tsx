import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, FileText, MessageSquare, Settings, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HeroSection } from '@/components/StudyMate/HeroSection';
import { PDFUploader } from '@/components/StudyMate/PDFUploader';
import { ChatInterface } from '@/components/StudyMate/ChatInterface';

const StudyMate = () => {
  const [showMainApp, setShowMainApp] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('upload');

  const handleGetStarted = () => {
    setShowMainApp(true);
  };

  const handleFilesProcessed = (files: any[]) => {
    setUploadedFiles(files);
    if (files.length > 0) {
      setActiveTab('chat');
    }
  };

  if (!showMainApp) {
    return <HeroSection onGetStarted={handleGetStarted} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowMainApp(false)}
                className="lg:hidden"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 ai-gradient rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">StudyMate AI</h1>
                  <p className="text-xs text-muted-foreground">Your intelligent study companion</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <HelpCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Upload Documents
                {uploadedFiles.length > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-primary/20 text-primary rounded-full text-xs">
                    {uploadedFiles.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Ask Questions
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="upload">
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold mb-2">Upload Your Study Materials</h2>
                      <p className="text-muted-foreground">
                        Upload your PDF documents and let StudyMate AI analyze them for you
                      </p>
                    </div>
                    <PDFUploader onFilesProcessed={handleFilesProcessed} />
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="chat">
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  {uploadedFiles.length > 0 ? (
                    <div className="max-w-4xl mx-auto">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold mb-2">Chat with Your Documents</h2>
                        <p className="text-muted-foreground">
                          Ask any questions about your uploaded materials
                        </p>
                      </div>
                      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
                        <ChatInterface uploadedFiles={uploadedFiles} />
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-md mx-auto text-center py-12">
                      <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">No documents uploaded yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Upload some PDF documents first to start chatting with StudyMate AI
                      </p>
                      <Button onClick={() => setActiveTab('upload')} variant="ai">
                        Upload Documents
                      </Button>
                    </div>
                  )}
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StudyMate;