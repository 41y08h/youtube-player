import Typography from "@material-ui/core/Typography";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import styles from "./Settings.module.scss";
import { useState } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CheckIcon from "@material-ui/icons/Check";

export default function Settings() {
  const [activeMenu, setActiveMenu] = useState("default");

  function MenuChangerItem({ children, goToMenu, value }) {
    function onClick() {
      setActiveMenu(goToMenu);
    }

    return (
      <li onClick={onClick} className={styles.menuChangerItem}>
        <Typography variant="subtitle2">{children}</Typography>
        <div className={styles.chevronArea}>
          <Typography variant="subtitle2">{value}</Typography>
          <ChevronRightIcon />
        </div>
      </li>
    );
  }

  function SettingsItem({ children, isChecked }) {
    return (
      <li
        onClick
        className={[styles.settingsItem, isChecked && styles.isChecked]
          .filter(Boolean)
          .join(" ")}
      >
        {isChecked && <CheckIcon style={{ fontSize: 18 }} />}
        <Typography variant="subtitle2">{children}</Typography>
      </li>
    );
  }

  function Menu({ children, heading }) {
    return (
      <div>
        <button
          className={styles.menuHeading}
          onClick={() => setActiveMenu("default")}
        >
          <ChevronLeftIcon />
          <Typography variant="subtitle2">{heading}</Typography>
        </button>
        <ul>{children}</ul>
      </div>
    );
  }

  const activeMenuJSX = {
    default: (
      <ul>
        <MenuChangerItem goToMenu="speed" value="Normal">
          Playback speed
        </MenuChangerItem>
      </ul>
    ),
    speed: (
      <Menu heading="Playback speed">
        <SettingsItem>0.25</SettingsItem>
        <SettingsItem>0.5</SettingsItem>
        <SettingsItem>0.75</SettingsItem>
        <SettingsItem isChecked>1</SettingsItem>
        <SettingsItem>1.25</SettingsItem>
        <SettingsItem>1.5</SettingsItem>
        <SettingsItem>1.75</SettingsItem>
        <SettingsItem>2</SettingsItem>
      </Menu>
    ),
  };

  return (
    <div className={styles.root}>
      {activeMenuJSX[activeMenu] || activeMenuJSX["default"]}
    </div>
  );
}
