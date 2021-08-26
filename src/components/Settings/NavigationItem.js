import styles from "./NavigationItem.module.scss";
import Typography from "@material-ui/core/Typography";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

export default function NavigatorItem({ children, value, ...props }) {
  return (
    <li className={styles.navigationItem} {...props}>
      <Typography variant="subtitle2">{children}</Typography>
      <div className={styles.chevronArea}>
        <Typography variant="subtitle2">{value}</Typography>
        <ChevronRightIcon />
      </div>
    </li>
  );
}
