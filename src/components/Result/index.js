import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Container, Menu, Button } from 'semantic-ui-react';

import Stats from './Stats';
import QNA from './QNA';

const Result = ({
  totalQuestions,
  correctAnswers,
  timeTaken,
  questionsAndAnswers,
  replayQuiz,
  resetQuiz,
}) => {
  const [activeTab, setActiveTab] = useState('Stats');

  const handleTabClick = (e, { name }) => {
    setActiveTab(name);
  };

  const contentRef = useRef(null);

  const downloadPDF = () => {
    const contentEl = contentRef.current;
    if (!contentEl) return;

    // Open a new window and write the result content into it, then trigger print.
    const printWindow = window.open('', '_blank');
    const styles = `
      <style>
        body { font-family: Arial, Helvetica, sans-serif; padding: 20px; color: #111; }
        h1,h2,h3 { margin: 0 0 10px 0; }
        table { border-collapse: collapse; width: 100%; margin-top: 10px; }
        table, th, td { border: 1px solid #ddd; padding: 8px; }
        th { background: #f4f4f4; text-align: left; }
      </style>
    `;

    printWindow.document.write(`
      <html>
        <head>
          <title>Quiz Result</title>
          ${styles}
        </head>
        <body>
          ${contentEl.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();

    // Give the new window a moment to render before calling print
    setTimeout(() => {
      printWindow.print();
    }, 300);
  };

  return (
    <Container>
      <Menu fluid widths={2}>
        <Menu.Item
          name="Stats"
          active={activeTab === 'Stats'}
          onClick={handleTabClick}
        />
        <Menu.Item
          name="QNA"
          active={activeTab === 'QNA'}
          onClick={handleTabClick}
        />
      </Menu>
      <div style={{ textAlign: 'right', marginTop: 10 }}>
        <Button
          icon="download"
          content="Download PDF"
          color="blue"
          onClick={downloadPDF}
        />
      </div>

      <div ref={contentRef}>
        {activeTab === 'Stats' && (
          <Stats
            totalQuestions={totalQuestions}
            correctAnswers={correctAnswers}
            timeTaken={timeTaken}
            replayQuiz={replayQuiz}
            resetQuiz={resetQuiz}
          />
        )}
        {activeTab === 'QNA' && <QNA questionsAndAnswers={questionsAndAnswers} />}
      </div>
      <br />
    </Container>
  );
};

Result.propTypes = {
  totalQuestions: PropTypes.number.isRequired,
  correctAnswers: PropTypes.number.isRequired,
  timeTaken: PropTypes.number.isRequired,
  questionsAndAnswers: PropTypes.array.isRequired,
  replayQuiz: PropTypes.func.isRequired,
  resetQuiz: PropTypes.func.isRequired,
};

export default Result;
