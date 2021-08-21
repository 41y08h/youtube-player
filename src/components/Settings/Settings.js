import Typography from "@material-ui/core/Typography";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import styles from "./Settings.module.scss";
import { useState } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CheckIcon from "@material-ui/icons/Check";

export default function Settings({ onPlaybackSpeedChange, playbackSpeed }) {
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

  function SettingsItem({ children, isChecked, ...props }) {
    return (
      <li
        {...props}
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

  return (
    <div className={styles.root}>
      {activeMenu === "default" && (
        <ul>
          <MenuChangerItem
            goToMenu="speed"
            value={playbackSpeed === 1 ? "Normal" : playbackSpeed}
          >
            Playback speed
          </MenuChangerItem>
        </ul>
      )}
      {activeMenu === "speed" && (
        <Menu heading="Playback speed">
          {[0.25, 0.5, 0.75, 1, 1.5, 1.75, 2].map((item) => (
            <SettingsItem
              key={item}
              isChecked={playbackSpeed === item}
              onClick={() => onPlaybackSpeedChange(item)}
            >
              {item}
            </SettingsItem>
          ))}
        </Menu>
      )}
    </div>
  );
}
