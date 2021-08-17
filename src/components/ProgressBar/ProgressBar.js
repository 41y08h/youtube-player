import Slider from "@material-ui/core/Slider";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import toHHMMSS from "../../utils/toHHMMSS";

const Main = withStyles({
  root: {
    color: "red",
    height: 3,
    transition: "0.2s height ease",
    padding: 0,

    "&:hover, &:active": {
      "&, & $track, & $rail": {
        height: 5
      },
      "& $thumb": {
        height: 14,
        width: 14,
        marginTop: -5,
        marginLeft: -7,
        borderRadius: 999
      }
    }
  },
  thumb: {
    height: 3,
    width: 3,
    backgroundColor: "red",
    borderRadius: 0,
    marginTop: 0,
    marginLeft: -4,
    border: "none"
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 3,
    transition: "0.2s height ease"
  },
  rail: {
    transition: "0.2s height ease",
    height: 3,
    backgroundColor: "rgba(255, 255, 255, 0.8)"
  }
})(Slider);

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip
      open={open}
      enterTouchDelay={0}
      placement="top"
      title={toHHMMSS(value)}
    >
      {children}
    </Tooltip>
  );
}

export default function ProgressBar(props) {
  return <Main {...props} ValueLabelComponent={ValueLabelComponent} />;
}
