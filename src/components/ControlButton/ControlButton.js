import { forwardRef } from "react";
import styles from "./ControlButton.module.scss";
import mergeClassNames from "../../lib/mergeClassNames";

const ControlButton = forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    {...props}
    className={mergeClassNames(styles.controlButton, className)}
  />
));

export default ControlButton;
