import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  footer?: ReactNode;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  title, 
  subtitle, 
  icon,
  footer,
  hover = false
}) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden ${
        hover ? 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg' : ''
      } ${className}`}
    >
      {(title || icon) && (
        <div className="flex items-center p-4 border-b border-gray-100">
          {icon && <div className="mr-3">{icon}</div>}
          <div>
            {title && <h3 className="text-lg font-medium text-[#1E2A49]">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
        </div>
      )}
      
      <div className="p-4">
        {children}
      </div>
      
      {footer && (
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;