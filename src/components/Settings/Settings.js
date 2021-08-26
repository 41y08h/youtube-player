import { useState } from "react";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import NavigationItem from "./NavigationItem";
import styles from "./Settings.module.scss";

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
            <MenuItem
              key={item}
              isChecked={playbackSpeed === item}
              onClick={() => onPlaybackSpeedChange(item)}
            >
              {item}
            </MenuItem>
          ))}
        </Menu>
      )}
    </div>
  );
}
