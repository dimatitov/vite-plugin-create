import styles from './Name.module.scss';

export interface Props {
  className?: string;
}

export const Name: React.FC<Props> = ({ className }) => {
  return (
    <div className={styles.root}>
      Name component
    </div>
  );
};