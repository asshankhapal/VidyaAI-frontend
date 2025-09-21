import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

const WorksheetGenerator = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [worksheetType, setWorksheetType] = useState('mcq');
  const [marks, setMarks] = useState(10);
  const [language, setLanguage] = useState('english');
  const [generatedWorksheets, setGeneratedWorksheets] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAnswers, setShowAnswers] = useState({});
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setError(null);
  };

  const toggleAnswers = (level) => {
    setShowAnswers(prev => ({
      ...prev,
      [level]: !prev[level]
    }));
  };

  // Function to parse the worksheet text into structured data
  const parseWorksheetText = (text, level) => {
    const worksheet = {
      title: `${level.charAt(0).toUpperCase() + level.slice(1)} Worksheet`,
      questions: []
    };
    
    // Extract title if available
    const titleMatch = text.match(/\*\*([^*]+)\*\*/);
    if (titleMatch && titleMatch[1]) {
      worksheet.title = titleMatch[1];
    }
    
    // Split by question markers
    const questionSections = text.split(/\n\n\d+\./);
    
    // Remove the first section (title and instructions)
    if (questionSections.length > 1) {
      questionSections.shift();
    }
    
    questionSections.forEach((section, index) => {
      const lines = section.trim().split('\n');
      if (lines.length === 0) return;
      
      const questionText = lines[0].trim();
      const question = {
        id: index + 1,
        text: questionText,
        answer: "Answer not found"
      };
      
      // Check if it's a multiple choice question
      if (questionText.includes('?') || questionText.includes(':')) {
        const options = [];
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line.match(/^[a-d]\)/)) {
            options.push(line);
          } else if (line.startsWith('**Answer Key:**')) {
            break;
          }
        }
        if (options.length > 0) {
          question.options = options;
        }
      }
      
      worksheet.questions.push(question);
    });
    
    // Try to extract answers from answer key
    const answerKeyIndex = text.indexOf('**Answer Key:**');
    if (answerKeyIndex !== -1) {
      const answerSection = text.substring(answerKeyIndex);
      const answerLines = answerSection.split('\n');
      
      answerLines.forEach((line, idx) => {
        if (idx === 0) return; // Skip the "Answer Key" header
        
        const answerMatch = line.match(/(\d+)\.\s*(.*)/);
        if (answerMatch && answerMatch[1] && answerMatch[2]) {
          const questionNum = parseInt(answerMatch[1]);
          if (worksheet.questions[questionNum - 1]) {
            worksheet.questions[questionNum - 1].answer = answerMatch[2].trim();
          }
        }
      });
    }
    
    return worksheet;
  };

  const handleGenerate = async () => {
    if (!selectedFile) {
      alert('Please upload a file first');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('type', worksheetType);
      formData.append('total_marks', marks);
      formData.append('lang', language);

      const response = await fetch('http://127.0.0.1:8000/api/v1/worksheet/worksheet/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server returned ${response.status}: ${errorText}`);
      }

      const worksheetsData = await response.json();
      
      // Parse the text responses into structured data
      const parsedWorksheets = {};
      if (worksheetsData.worksheets) {
        Object.keys(worksheetsData.worksheets).forEach(level => {
          parsedWorksheets[level] = parseWorksheetText(worksheetsData.worksheets[level], level);
        });
      }
      
      setGeneratedWorksheets(parsedWorksheets);
    } catch (error) {
      console.error('Error generating worksheets:', error);
      setError(error.message);
      alert(`Failed to generate worksheets: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (level, withAnswers = false) => {
    if (!generatedWorksheets || !generatedWorksheets[level]) return;

    const worksheet = generatedWorksheets[level];
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.text(worksheet.title, 105, 15, { align: 'center' });

    // Type and level
    doc.setFontSize(12);
    doc.text(`Type: ${worksheetType.toUpperCase()} | Level: ${level.toUpperCase()}`, 105, 25, { align: 'center' });

    let yPosition = 40;

    worksheet.questions.forEach((q, index) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(12);
      const questionText = `${index + 1}. ${q.text}`;
      const splitText = doc.splitTextToSize(questionText, 170);
      doc.text(splitText, 20, yPosition);
      yPosition += splitText.length * 7;

      if (worksheetType === 'mcq' && q.options) {
        q.options.forEach((option, optIndex) => {
          doc.text(`   ${String.fromCharCode(65 + optIndex)}) ${option}`, 20, yPosition);
          yPosition += 7;
        });
      }

      yPosition += 7;

      if (withAnswers) {
        doc.setFontSize(10);
        doc.setTextColor(0, 128, 0);
        const answerText = `Answer: ${q.answer}`;
        const splitAnswer = doc.splitTextToSize(answerText, 170);
        doc.text(splitAnswer, 20, yPosition);
        doc.setTextColor(0, 0, 0);
        yPosition += splitAnswer.length * 7;
      }
    });

    const fileName = withAnswers
      ? `${worksheetType}_${level}_answers.pdf`
      : `${worksheetType}_${level}_worksheet.pdf`;

    doc.save(fileName);
  };

  const renderQuestion = (q, index) => (
    <div key={index} className="question-item">
      <p><strong>Q{index + 1}:</strong> {q.text}</p>
      {worksheetType === 'mcq' && q.options && (
        <div className="options-list">
          {q.options.map((option, optIndex) => (
            <div key={optIndex} className="option-item">
              {String.fromCharCode(65 + optIndex)}) {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="worksheet-generator">
      <header className="app-header">
        <h1>Differentiated Worksheet Generator</h1>
        <p>Create customized worksheets for different learning levels</p>
      </header>

      <div className="container">
        {/* Upload Section */}
        <div className="upload-section">
          <h2>Upload Material</h2>
          <div className="file-upload">
            <label htmlFor="file-upload" className="upload-label">
              <div className="upload-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <p>{selectedFile ? selectedFile.name : 'Choose a file or drag it here'}</p>
                <p className="file-types">Supports: JPG, PNG, PDF</p>
              </div>
              <input
                id="file-upload"
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
                className="file-input"
              />
            </label>
          </div>
        </div>

        {/* Options Section */}
        <div className="options-section">
          <h2>Worksheet Options</h2>
          <div className="options-grid">
            <div className="option-group">
              <label>Worksheet Type</label>
              <select value={worksheetType} onChange={(e) => setWorksheetType(e.target.value)}>
                <option value="mcq">Multiple Choice (MCQ)</option>
                <option value="quiz">Quick Quiz</option>
                <option value="descriptive">Descriptive Test</option>
                <option value="short">Short Answers</option>
                <option value="FillInBlanks">Fill in the blanks</option>
                <option value="TrueFalse">True/False</option>
              </select>
            </div>

            <div className="option-group">
              <label>Total Marks</label>
              <input type="number" min="5" max="100" value={marks} onChange={(e) => setMarks(Number(e.target.value))} />
            </div>

            <div className="option-group">
              <label>Language</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="english">English</option>
                <option value="tamil">Tamil</option>
                <option value="gujarati">Gujarati</option>
                <option value="hindi">Hindi</option>
                <option value="marathi">Marathi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="action-section">
          <button className="generate-btn" onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? 'Generating...' : 'Generate Worksheets'}
          </button>
        </div>

        {error && (
          <div className="error-section">
            <h3>Error</h3>
            <p>{error}</p>
          </div>
        )}

        {/* Render Worksheets */}
        {Object.keys(generatedWorksheets).length > 0 && (
          <div className="results-section">
            <h2>Generated Worksheets</h2>
            <div className="worksheets-container">
              {['easy', 'medium', 'hard'].map(level => (
                generatedWorksheets[level] && (
                  <div key={level} className="worksheet-card">
                    <h3>{generatedWorksheets[level].title}</h3>
                    <div className="worksheet-content">
                      {generatedWorksheets[level].questions.map(renderQuestion)}
                    </div>
                    <div className="worksheet-actions">
                      <button className="download-btn" onClick={() => handleDownload(level)}>Download PDF</button>
                      <button className="answers-btn" onClick={() => toggleAnswers(level)}>
                        {showAnswers[level] ? 'Hide Answers' : 'Show Answers'}
                      </button>
                      <button className="download-answers-btn" onClick={() => handleDownload(level, true)}>Download Answer Key</button>
                    </div>
                    {showAnswers[level] && (
                      <div className="answers-section">
                        <h4>Answer Key</h4>
                        {generatedWorksheets[level].questions.map((q, idx) => (
                          <div key={idx} className="answer-item">
                            <p><strong>Question {idx + 1}:</strong> {q.text}</p>
                            <p><strong>Answer:</strong> {q.answer}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .worksheet-generator {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .app-header {
          text-align: center;
          margin-bottom: 30px;
          padding: 20px;
          background: linear-gradient(135deg, #6e8efb, #a777e3);
          color: white;
          border-radius: 10px;
        }
        
        .app-header h1 {
          margin: 0;
          font-size: 2.2rem;
        }
        
        .app-header p {
          margin: 10px 0 0;
          opacity: 0.9;
        }
        
        .container {
          background: white;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          padding: 30px;
        }
        
        .upload-section {
          margin-bottom: 30px;
        }
        
        .upload-section h2 {
          margin-top: 0;
          color: #444;
        }
        
        .file-upload {
          border: 2px dashed #ccc;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          transition: all 0.3s;
        }
        
        .file-upload:hover {
          border-color: #6e8efb;
        }
        
        .upload-label {
          cursor: pointer;
          display: block;
        }
        
        .upload-content {
          padding: 30px 20px;
        }
        
        .upload-content svg {
          margin-bottom: 15px;
          color: #6e8efb;
        }
        
        .file-types {
          font-size: 0.9rem;
          color: #777;
          margin-top: 5px;
        }
        
        .file-input {
          display: none;
        }
        
        .options-section {
          margin-bottom: 30px;
        }
        
        .options-section h2 {
          margin-top: 0;
          color: #444;
        }
        
        .options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 25px;
        }
        
        .option-group {
          display: flex;
          flex-direction: column;
        }
        
        .option-group label {
          font-weight: 600;
          margin-bottom: 8px;
          color: #555;
        }
        
        .option-group select, .option-group input {
          padding: 10px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
        }
        
        .action-section {
          text-align: center;
          margin: 30px 0;
        }
        
        .generate-btn {
          background: linear-gradient(135deg, #6e8efb, #a777e3);
          color: white;
          border: none;
          padding: 12px 30px;
          font-size: 1.1rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .generate-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(110, 142, 251, 0.4);
        }
        
        .generate-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        .error-section {
          background-color: #ffebee;
          border: 1px solid #f44336;
          border-radius: 8px;
          padding: 15px;
          margin: 20px 0;
          color: #c62828;
        }
        
        .results-section {
          margin-top: 40px;
        }
        
        .results-section h2 {
          margin-top: 0;
          color: #444;
          border-bottom: 2px solid #eee;
          padding-bottom: 10px;
        }
        
        .worksheets-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 25px;
          margin-top: 20px;
        }
        
        .worksheet-card {
          border: 1px solid #eaeaea;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s;
        }
        
        .worksheet-card:hover {
          transform: translateY(-5px);
        }
        
        .worksheet-card h3 {
          margin-top: 0;
          color: #6e8efb;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        
        .worksheet-content {
          margin-bottom: 20px;
          min-height: 200px;
          max-height: 400px;
          overflow-y: auto;
          padding: 10px;
          background: #f9f9f9;
          border-radius: 6px;
        }
        
        .question-item {
          margin-bottom: 15px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
        }
        
        .question-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        
        .options-list {
          margin-left: 20px;
          margin-top: 8px;
        }
        
        .option-item {
          margin-bottom: 5px;
          font-size: 0.95rem;
        }
        
        .worksheet-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .download-btn {
          background: #4CAF50;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          transition: background 0.3s;
        }
        
        .download-btn:hover {
          background: #3d8b40;
        }
        
        .answers-btn {
          background: #2196F3;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          transition: background 0.3s;
        }
        
        .answers-btn:hover {
          background: #0b7dda;
        }
        
        .download-answers-btn {
          background: #9c27b0;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          transition: background 0.3s;
        }
        
        .download-answers-btn:hover {
          background: #7b1fa2;
        }
        
        .answers-section {
          margin-top: 20px;
          padding: 15px;
          background-color: #f9f9f9;
          border-radius: 6px;
          border-left: 4px solid #4CAF50;
        }
        
        .answers-section h4 {
          margin-top: 0;
          color: #4CAF50;
        }
        
        .answer-item {
          margin-bottom: 15px;
          padding-bottom: 15px;
          border-bottom: 1px dashed #ddd;
        }
        
        .answer-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        
        .answer-item p {
          margin: 8px 0;
        }
        
        @media (max-width: 768px) {
          .options-grid {
            grid-template-columns: 1fr;
          }
          
          .worksheets-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default WorksheetGenerator;