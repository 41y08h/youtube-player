import Slider from "@material-ui/core/Slider";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const Main = withStyles({
  root: {
    color: "white",
    height: 3,
    width: 52,
    transition: "0.2s height ease",
  },
  thumb: {
    height: 12,
    width: 12,
    marginTop: -4,
    marginLeft: -6,
    borderRadius: 999,
    backgroundColor: "white",
    boxShadow: "none !important",
  },
  track: {
    height: 3,
  },
  rail: {
    height: 3,
  },
})(Slider);

const useStyles = makeStyles({
  root: {},
});

export default function VolumeBar(props) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Main {...props} />
    </div>
  );
}
