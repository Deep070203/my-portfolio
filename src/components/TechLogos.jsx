import React from 'react';

// Go / Golang Logo
export function GoLogo({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M1.8 11.2C1.4 11.2 1 11.6 1 12C1 12.4 1.4 12.8 1.8 12.8H7.2C7.6 12.8 8 12.4 8 12C8 11.6 7.6 11.2 7.2 11.2H1.8Z" fill="#00ADD8"/>
      <path d="M12 1.8C6.37 1.8 1.8 6.37 1.8 12C1.8 17.63 6.37 22.2 12 22.2C17.63 22.2 22.2 17.63 22.2 12C22.2 6.37 17.63 1.8 12 1.8ZM16.8 13.2H12V10.8H19.2C19.32 11.19 19.4 11.59 19.4 12C19.4 16.08 16.08 19.4 12 19.4C7.92 19.4 4.6 16.08 4.6 12C4.6 7.92 7.92 4.6 12 4.6C13.88 4.6 15.6 5.31 16.92 6.48L15.22 8.18C14.36 7.42 13.24 7 12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.41 17 16.42 15.29 16.88 13.2H16.8Z" fill="#00ADD8"/>
    </svg>
  );
}

// TypeScript Logo
export function TypeScriptLogo({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#3178C6"/>
      <path d="M11.625 18.375V11.25H7.5V9.375H17.625V11.25H13.5V18.375H11.625ZM18 18.375C17.34 18.375 16.78 18.17 16.32 17.76C15.86 17.35 15.63 16.75 15.63 15.96H17.415C17.415 16.34 17.5 16.61 17.67 16.77C17.84 16.93 18.065 17.01 18.345 17.01C18.615 17.01 18.82 16.94 18.96 16.8C19.1 16.66 19.17 16.48 19.17 16.26C19.17 16.04 19.09 15.86 18.93 15.72C18.77 15.58 18.425 15.425 17.895 15.255C17.025 14.975 16.425 14.685 16.095 14.385C15.765 14.085 15.6 13.62 15.6 12.99C15.6 12.28 15.865 11.715 16.395 11.295C16.925 10.875 17.6 10.665 18.42 10.665C19.23 10.665 19.875 10.875 20.355 11.295C20.835 11.715 21.09 12.28 21.12 12.99H19.335C19.305 12.65 19.205 12.4 19.035 12.24C18.865 12.08 18.64 12 18.36 12C18.1 12 17.91 12.065 17.79 12.195C17.67 12.325 17.61 12.485 17.61 12.675C17.61 12.875 17.695 13.045 17.865 13.185C18.035 13.325 18.425 13.495 19.035 13.695C19.865 13.965 20.44 14.26 20.76 14.58C21.08 14.9 21.24 15.355 21.24 15.945C21.24 16.715 20.955 17.31 20.385 17.73C19.815 18.15 19.02 18.36 18 18.36V18.375Z" fill="white"/>
    </svg>
  );
}

// Python Logo
export function PythonLogo({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M11.896 2c-5.289 0-4.961 2.292-4.961 2.292l.006 2.378h5.021v.72H4.895S2 7.078 2 12.392c0 5.313 2.529 5.12 2.529 5.12h1.512v-2.127s-.082-2.529 2.529-2.529h5.023s2.428.026 2.428-2.347V5.215S16.48 2 11.896 2zm-2.73 1.545a.952.952 0 1 1 0 1.905.952.952 0 0 1 0-1.905z" fill="#3776AB"/>
      <path d="M12.104 22c5.289 0 4.961-2.292 4.961-2.292l-.006-2.378h-5.021v-.72h7.067S22 16.922 22 11.608c0-5.313-2.529-5.12-2.529-5.12h-1.512v2.127s.082 2.529-2.529 2.529h-5.023s-2.428-.026-2.428 2.347v7.31S7.52 22 12.104 22zm2.73-1.545a.952.952 0 1 1 0-1.905.952.952 0 0 1 0 1.905z" fill="#FFD43B"/>
    </svg>
  );
}

// Rust Logo
export function RustLogo({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2A10 10 0 1 0 22 12 A10 10 0 0 0 12 2 Z M12 5 A7 7 0 1 1 5 12 A7 7 0 0 1 12 5 Z" fill="#DEA584" opacity="0.2"/>
      <path d="M7 10H17V12H7V10ZM7 13H15V15H7V13Z" fill="#DEA584"/>
      <circle cx="12" cy="12" r="9" stroke="#DEA584" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
    </svg>
  );
}

// Java Logo
export function JavaLogo({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M8.851 18.56s-.917.215-2.032.25c-2.336.074-3.593-.687-3.593-.687s1.08.384 2.658.261c1.378-.108 2.967-.824 2.967-.824zm-.525-2.535s-1.897.669-3.791.564c-1.397-.078-2.008-.431-2.008-.431s.783.256 1.97.235c1.862-.033 3.829-.868 3.829-.868z" fill="#5382A1"/>
      <path d="M10.742 12.01s1.393.856.401 2.378c-.911 1.398-2.61 2.457-5.006 3.125 0 0 1.936-.453 3.328-1.503 1.455-1.096.764-2.227.764-2.227zm5.556 5.865s.745-.632-1.054-1.018c-2.091-.45-4.836.035-4.836.035s2.464-.384 4.095-.084c1.385.255 1.795 1.067 1.795 1.067z" fill="#E76F00"/>
    </svg>
  );
}

// C# / .NET Logo
export function CSharpLogo({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="#512BD4" opacity="0.9"/>
      <path d="M9.5 15.5C8.1 15.5 7 14.4 7 13V11C7 9.6 8.1 8.5 9.5 8.5C10.6 8.5 11.5 9.2 11.8 10.2H10.4C10.2 9.8 9.9 9.6 9.5 9.6C8.7 9.6 8.1 10.2 8.1 11V13C8.1 13.8 8.7 14.4 9.5 14.4C9.9 14.4 10.2 14.2 10.4 13.8H11.8C11.5 14.8 10.6 15.5 9.5 15.5ZM13 14V13H14V14H13ZM13 11V10H14V11H13ZM15 14V13H16V14H15ZM15 11V10H16V11H15Z" fill="white"/>
    </svg>
  );
}

// PostgreSQL Logo
export function PostgresLogo({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM15.5 15C14.7 15 14.1 14.4 14.1 13.6C14.1 12.8 14.7 12.2 15.5 12.2C16.3 12.2 16.9 12.8 16.9 13.6C16.9 14.4 16.3 15 15.5 15ZM11.5 15C10.7 15 10.1 14.4 10.1 13.6C10.1 12.8 10.7 12.2 11.5 12.2C12.3 12.2 12.9 12.8 12.9 13.6C12.9 14.4 12.3 15 11.5 15Z" fill="#336791"/>
      <path d="M12 5C8.5 5 5.5 7.5 5.5 11C5.5 13.5 7 15.5 9 16.5V19.5L12 18L15 19.5V16.5C17 15.5 18.5 13.5 18.5 11C18.5 7.5 15.5 5 12 5Z" fill="#336791" opacity="0.4"/>
    </svg>
  );
}

// Spring Boot Logo
export function SpringBootLogo({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 17.5L6.5 13L7.91 11.59L11 14.67L16.09 9.58L17.5 11L11 17.5Z" fill="#6DB33F"/>
    </svg>
  );
}

// Kafka Logo
export function KafkaLogo({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#231F20" strokeWidth="2" fill="#231F20"/>
      <path d="M8 12H16M12 8V16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

// Redis Logo
export function RedisLogo({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" fill="#DC382D"/>
      <path d="M12 6L7 9V15L12 18L17 15V9L12 6Z" fill="white" opacity="0.3"/>
    </svg>
  );
}

// Docker & Kubernetes Logo
export function DockerLogo({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M13 3H16V6H13V3ZM9 3H12V6H9V3ZM9 7H12V10H9V7ZM13 7H16V10H13V7ZM17 7H20V10H17V7ZM5 7H8V10H5V7ZM9 11H12V14H9V11ZM13 11H16V14H13V11ZM17 11H20V14H17V11ZM2 14.5C2 17.54 4.46 20 7.5 20H16.5C19.54 20 22 17.54 22 14.5H2Z" fill="#2496ED"/>
    </svg>
  );
}

// PyTorch Logo
export function PyTorchLogo({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M13.5 2.5L12 4L15.5 7.5L12 11L13.5 12.5L18.5 7.5L13.5 2.5Z" fill="#EE4C2C"/>
      <circle cx="9" cy="15" r="4" stroke="#EE4C2C" strokeWidth="2" fill="none"/>
    </svg>
  );
}

// AWS Logo
export function AWSLogo({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M6.5 16.5C9.5 18.5 14.5 18.5 17.5 16.5M18.5 15.5L19.5 17L17 17.5" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 8L9.5 14L12 8L14.5 14L17 8" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// REST API Logo / Zap Globe Icon
export function RestApiLogo({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V13H8L12 7V11H15L13 17Z" fill="#0EA5E9"/>
    </svg>
  );
}

// Google Cloud Logo
export function GoogleCloudLogo({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4" opacity="0.15"/>
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" stroke="#4285F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.5 12.5L11.5 14.5L15 11" stroke="#34A853" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
