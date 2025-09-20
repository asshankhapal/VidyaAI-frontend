import React, { useState, useRef, useEffect } from 'react';
import mermaid from 'mermaid';

const EduVisualAidGenerator = () => {
  // State management
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [mermaidCode, setMermaidCode] = useState('');
  const [svgOutput, setSvgOutput] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Refs
  const fileInputRef = useRef(null);
  const mermaidContainerRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize mermaid
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'Arial, sans-serif'
    });
  }, []);

  // Handle speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setInputText(transcript);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };
    }
  }, []);

  // Toggle speech recognition
  const toggleSpeechRecognition = () => {
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Generate visual aid
  const generateVisualAid = () => {
    setIsGenerating(true);
    
    // Simulate API call to generate mermaid code
    setTimeout(() => {
      // This would typically come from your backend API
      const generatedCode = `graph TD
        A[Teacher's Description] --> B(Generate Visual Aid)
        B --> C{Mermaid Code}
        C --> D[Flowchart]
        C --> E[Diagram]
        C --> F[Chart]
        D --> G[Output]
        E --> G
        F --> G`;
      
      setMermaidCode(generatedCode);
      setIsGenerating(false);
      
      // Render mermaid
      setTimeout(() => {
        if (mermaidContainerRef.current) {
          mermaid.init(undefined, mermaidContainerRef.current);
        }
      }, 100);
    }, 1500);
  };

  // Download output
  const downloadOutput = (format) => {
    alert(`Downloading in ${format} format would be implemented here`);
    // Actual implementation would depend on your backend API
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">EduVisuals</h1>
          <p className="text-blue-600">Generate educational visual aids from descriptions</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Input Description</h2>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-blue-700 font-medium">Describe your visual aid:</label>
                <button
                  onClick={toggleSpeechRecognition}
                  className={`flex items-center px-3 py-1 rounded-full text-sm ${isRecording ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}
                >
                  <i className={`fas ${isRecording ? 'fa-microphone-slash' : 'fa-microphone'} mr-1`}></i>
                  {isRecording ? 'Stop Recording' : 'Speech Input'}
                </button>
              </div>
              
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Describe the visual aid you want to create (e.g., 'a simple water cycle diagram with evaporation, condensation, and precipitation')"
                className="w-full h-40 p-4 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-blue-700 font-medium mb-2">Upload reference image (optional):</label>
              <div className="flex items-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <i className="fas fa-upload mr-2"></i>
                  Choose File
                </button>
                {uploadedImage && (
                  <span className="ml-3 text-sm text-blue-600">
                    <i className="fas fa-check-circle text-green-500 mr-1"></i>
                    Image uploaded
                  </span>
                )}
              </div>
            </div>
            
            <button
              onClick={generateVisualAid}
              disabled={isGenerating || !inputText.trim()}
              className={`w-full py-3 rounded-lg font-medium transition-all ${isGenerating || !inputText.trim() ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            >
              {isGenerating ? (
                <span>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Generating...
                </span>
              ) : (
                'Generate Visual Aid'
              )}
            </button>
          </div>

          {/* Output Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Visual Output</h2>
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-blue-700 font-medium">Preview:</span>
              <div className="flex space-x-2">
                <button 
                  onClick={() => downloadOutput('svg')}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                >
                  <i className="fas fa-download mr-1"></i> SVG
                </button>
                <button 
                  onClick={() => downloadOutput('png')}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                >
                  <i className="fas fa-download mr-1"></i> PNG
                </button>
                <button 
                  onClick={() => downloadOutput('pdf')}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                >
                  <i className="fas fa-download mr-1"></i> PDF
                </button>
              </div>
            </div>
            
            <div className="border-2 border-dashed border-blue-200 rounded-lg p-4 min-h-[300px] flex items-center justify-center">
              {mermaidCode ? (
                <div ref={mermaidContainerRef} className="mermaid w-full">
                  {mermaidCode}
                </div>
              ) : (
                <div className="text-center text-blue-400">
                  <i className="fas fa-image text-4xl mb-3"></i>
                  <p>Your visual aid will appear here</p>
                </div>
              )}
            </div>
            
            {mermaidCode && (
              <div className="mt-4">
                <label className="block text-blue-700 font-medium mb-2">Mermaid.js Code:</label>
                <pre className="bg-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
                  {mermaidCode}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Example Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Example Usage</h2>
          <p className="text-blue-700 mb-4">Try these example descriptions:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setInputText("Create a water cycle diagram showing evaporation, condensation, precipitation, and collection.")}
              className="p-4 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors text-left"
            >
              <i className="fas fa-tint text-blue-500 mr-2"></i>
              Water Cycle Diagram
            </button>
            <button
              onClick={() => setInputText("Draw a flowchart of photosynthesis with light, water, and CO2 as inputs and glucose and oxygen as outputs.")}
              className="p-4 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors text-left"
            >
              <i className="fas fa-leaf text-green-500 mr-2"></i>
              Photosynthesis Flowchart
            </button>
            <button
              onClick={() => setInputText("Create a bar chart comparing the average rainfall in different months for a temperate climate.")}
              className="p-4 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors text-left"
            >
              <i className="fas fa-chart-bar text-yellow-500 mr-2"></i>
              Rainfall Bar Chart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EduVisualAidGenerator;