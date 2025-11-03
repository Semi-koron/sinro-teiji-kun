import { useState, useEffect } from "react";

const useOrientation = () => {
  const [orientation, setOrientation] = useState<{
    alpha: number;
    beta: number;
    gamma: number;
  } | null>(null);
  const [permission, setPermission] = useState<"granted" | "denied" | "prompt">(
    "prompt"
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      setOrientation({
        alpha: event.alpha ?? 0, // 方位角（ヨー）
        beta: event.beta ?? 0, // 前後の傾き（ピッチ）
        gamma: event.gamma ?? 0, // 左右の傾き（ロール）
      });
    };

    if (permission === "granted") {
      window.addEventListener("deviceorientation", handleOrientation);

      return () => {
        window.removeEventListener("deviceorientation", handleOrientation);
      };
    }
  }, [permission]);

  const requestPermission = async () => {
    try {
      type DeviceOrientationEventiOS = typeof DeviceOrientationEvent & {
        requestPermission?: () => Promise<PermissionState>;
      };

      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof (DeviceOrientationEvent as DeviceOrientationEventiOS)
          .requestPermission === "function"
      ) {
        const response = await (
          DeviceOrientationEvent as DeviceOrientationEventiOS
        ).requestPermission!();
        setPermission(response);
        if (response !== "granted") {
          setError("センサーへのアクセスが拒否されました");
        }
      } else {
        // Android や古いブラウザは許可不要
        setPermission("granted");
      }
    } catch (err) {
      setError(`エラー: ${err}`);
      setPermission("denied");
    }
  };

  return { orientation, permission, error, requestPermission };
};

export default useOrientation;
