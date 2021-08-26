import { useState } from "react";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import NavigationItem from "./NavigationItem";
import styles from "./Settings.module.scss";
import { CSSTransition } from "react-transition-group";
import { useEffect, useRef } from "react";

export default function Settings({ onPlaybackSpeedChange, playbackSpeed }) {
  const [activeMenu, setActiveMenu] = useState("default");
  const [menuHeight, setMenuHeight] = useState(null);
  const menuRef = useRef(null);
  const menuVerticalPadding = 16;
  const speed = 350;

  useEffect(() => {
    setMenuHeight(
      menuRef.current?.firstChild.offsetHeight + menuVerticalPadding
    );
  }, []);

  function calcHeight(el) {
    console.log("calc height called");
    const height = el.offsetHeight + menuVerticalPadding;
    setMenuHeight(height);
  }

  const getMenuChanger = (key) => () => setActiveMenu(key);

  return (
    <div className={styles.root} style={{ height: menuHeight }} ref={menuRef}>
      <CSSTransition
        in={activeMenu === "default"}
        unmountOnExit
        timeout={speed}
        onEnter={calcHeight}
        classNames={{
          enter: styles.menuPrimaryEnter,
          enterActive: styles.menuPrimaryEnterActive,
          exit: styles.menuPrimaryExit,
          exitActive: styles.menuPrimaryExitActive,
        }}
      >
        <ul className={styles.menu}>
          <NavigationItem
            onClick={getMenuChanger("speed")}
            value={playbackSpeed === 1 ? "Normal" : playbackSpeed}
          >
            Playback speed
          </NavigationItem>
        </ul>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === "speed"}
        unmountOnExit
        timeout={speed}
        onEnter={calcHeight}
        classNames={{
          enter: styles.menuSecondaryEnter,
          enterActive: styles.menuSecondaryEnterActive,
          exit: styles.menuSecondaryExit,
          exitActive: styles.menuSecondaryExitActive,
        }}
      >
        <Menu
          heading="Playback speed"
          onBack={getMenuChanger("default")}
          className={styles.menu}
        >
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
      </CSSTransition>
    </div>
  );
}
