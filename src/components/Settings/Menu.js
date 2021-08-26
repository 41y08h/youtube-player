import styles from "./Menu.module.scss";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Typography from "@material-ui/core/Typography";

export default function Menu({ children, heading, onBack, ...props }) {
  return (
    <div {...props}>
      <button className={styles.menuHeading} onClick={onBack}>
        <ChevronLeftIcon />
        <Typography variant="subtitle2">{heading}</Typography>
      </button>
      <ul>{children}</ul>
    </div>
  );
}
