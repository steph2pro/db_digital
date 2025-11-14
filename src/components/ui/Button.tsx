import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  href?: string;
  target?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  href,
  target
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-custom transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/50";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark shadow-custom hover:shadow-lg",
    secondary: "bg-secondary text-white hover:bg-gray-700 shadow-custom hover:shadow-lg",
    outline: "border border-primary text-primary hover:bg-primary hover:text-white"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// import React from 'react';

// interface ButtonProps {
//   children: React.ReactNode;
//   onClick?: () => void;
//   variant?: 'primary' | 'secondary';
//   className?: string;
//   type?: 'button' | 'submit' | 'reset';
// }

// export const Button: React.FC<ButtonProps> = ({ 
//   children, 
//   onClick, 
//   variant = 'primary', 
//   className = '',
//   type = 'button'
// }) => {
//   const baseClasses = "rounded-custom px-6 py-3 font-medium transition-all duration-300 focus:outline-none focus:ring-4";
  
//   const variants = {
//     primary: "bg-primary text-tertiary hover:bg-primary-dark shadow-custom",
//     secondary: "bg-secondary text-tertiary hover:bg-gray-700 shadow-custom"
//   };

//   return (
//     <button
//       type={type}
//       className={`${baseClasses} ${variants[variant]} ${className}`}
//       onClick={onClick}
//     >
//       {children}
//     </button>
//   );
// };