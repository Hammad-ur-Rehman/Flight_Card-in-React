import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from "./Button.module.css";

interface ButtonProps {
  to?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ to, onClick, className, children }) => {
  const combinedClassName = `${styles.button} ${className}`;

  if (to) {
    return (
      <Link to={to}>
        <button className={combinedClassName}>{children}</button>
      </Link>
    );
  }

  return (
    <button className={combinedClassName} onClick={onClick}>
      {children}
    </button>
  );
};

// const Buttonlayout: FC = () => {
//   return (
//     <div>
//       <Button className={styles.customButton}>Custom Button</Button>

//     </div>
//   );
// }

export default Button;
// export { Buttonlayout };