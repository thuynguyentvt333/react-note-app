import React, { useEffect } from 'react';
import { Spinner } from 'reactstrap';
import './LoadingSpinner.scss';

const LoadingSpinner = ({ duration = 2000, onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onFinish]);

  return (
    <div className="loading-spinner">
      <Spinner color="primary" />
    </div>
  );
};

export default LoadingSpinner;
