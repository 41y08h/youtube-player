import styles from "./MenuItem.module.scss";
import CheckIcon from "@material-ui/icons/Check";
import Typography from "@material-ui/core/Typography";
import mergeClassNames from "../../lib/mergeClassNames";

export default function MenuItem({ children, isChecked, ...props }) {
  return (
    <li
      {...props}
      className={mergeClassNames(
        styles.menuItem,
        isChecked && styles.isChecked
      )}
    >
      {isChecked && <CheckIcon style={{ fontSize: 18 }} />}
      <Typography variant="subtitle2">{children}</Typography>
    </li>
  );
}
