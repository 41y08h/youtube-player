import Typography from "@material-ui/core/Typography";
import styles from "./Settings.module.scss";
import { useState } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CheckIcon from "@material-ui/icons/Check";
import NavigationItem from "./NavigationItem";

function Menu({ children, heading, onBack }) {
  return (
    <div>
      <button className={styles.menuHeading} onClick={onBack}>
        <ChevronLeftIcon />
        <Typography variant="subtitle2">{heading}</Typography>
      </button>
      <ul>{children}</ul>
    </div>
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

export default function Settings({ onPlaybackSpeedChange, playbackSpeed }) {
  const [activeMenu, setActiveMenu] = useState("default");

  const getMenuChanger = (key) => () => setActiveMenu(key);

  return (
    <div className={styles.root}>
      {activeMenu === "default" && (
        <ul>
          <NavigationItem
            onClick={getMenuChanger("speed")}
            value={playbackSpeed === 1 ? "Normal" : playbackSpeed}
          >
            Playback speed
          </NavigationItem>
        </ul>
      )}
      {activeMenu === "speed" && (
        <Menu heading="Playback speed" onBack={getMenuChanger("default")}>
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
