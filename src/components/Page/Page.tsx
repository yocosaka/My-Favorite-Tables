import styles from './Page.module.scss';

type PropTypes = {
  children: React.ReactNode;
};

const Page = ({ children }: PropTypes) => {
  return <div className={styles.pageContainer}>{children}</div>;
};
export default Page;
