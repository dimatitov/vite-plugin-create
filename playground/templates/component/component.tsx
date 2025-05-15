import styles from './{{name}}.module.scss';

export interface Props {
  className?: string;
}

export const {{name}}: React.FC<Props> = ({ className }) => {
  return (
    <div className={styles.root}>
      {{name}} component
    </div>
  );
};