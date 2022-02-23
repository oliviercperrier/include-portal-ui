import styles from './index.module.scss';

interface OwnProps {
  href: string;
  children: React.ReactNode;
}

const ExternalLink = ({ href, children }: OwnProps) => (
  <a className={styles.externalLink} href={href} rel="noreferrer" target="_blank">
    {children}
  </a>
);

export default ExternalLink;
