import './styles.css';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline';
}

export const Button = ({ label, onClick, variant = 'primary' }: ButtonProps) => {
  return (
    <button className={`custom-button ${variant}`} onClick={onClick}>
      {label}
    </button>
  );
};
