import React from 'react';

interface AppsCardProps {
  name: string;
  description: string;
}

const AppsCard: React.FC<AppsCardProps> = ({ name, description }) => {
  return (
    <div className="app-card">
      <h4 className="app-card-title">{name}</h4>
      <p className="app-card-description">{description}</p>
    </div>
  );
};

export default AppsCard;
