import { RoundedBox } from "@react-three/drei";
import { useMemo } from "react";

const sheets = 7;

export const PageStack = ({ showLeft }: { showLeft: boolean }) => {
  const layers = useMemo(() => Array.from({ length: sheets }, (_, index) => index), []);

  return (
    <group>
      {([-1, 1] as const).filter((side) => side === 1 || showLeft).flatMap((side) =>
        layers.map((layer) => (
          <RoundedBox
            key={`${side}-${layer}`}
            args={[5.72, 3.78, 0.025]}
            radius={0.035}
            smoothness={2}
            position={[side * 2.91, 0, -0.08 + layer * 0.026]}
            receiveShadow
          >
            <meshStandardMaterial
              color={layer % 2 === 0 ? "#faf7f2" : "#f4ecdf"}
              roughness={0.94}
            />
          </RoundedBox>
        )),
      )}
    </group>
  );
};
