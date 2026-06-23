import "./index.css";
import { Composition } from "remotion";
import { DroneWatchComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DroneWatch"
        component={DroneWatchComposition}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
