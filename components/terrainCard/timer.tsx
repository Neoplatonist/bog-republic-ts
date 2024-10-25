'use client';

import React, { useEffect, useState } from "react";
import FormatMsToTime from "@/libs/timer";
import { useTypedSelector } from "@/libs/redux";
import { selectTimer } from "@/libs/redux/timers";

interface TerrainTimerProps {
  terrainId: number;
  waitTime: number;
};

/**
 * A timer component that displays the remaining time for a terrain.
 * This code updates the timer shown above the terrain when it is locked.
 * The timer will show the time remaining in seconds, and will count down to 0.
 * After the timer reaches 0, it will reset to the original time.
 * The timer will stop counting down if the terrain is unlocked.
 * @param {Object} props - The component props.
 * @param {string} props.terrainId - The ID of the terrain.
 * @param {number} props.waitTime - The wait time for the terrain, in milliseconds.
 * @returns {JSX.Element} - The timer component.
 */
const TerrainTimer = ({ terrainId, waitTime }: TerrainTimerProps) => {
  const timer = useTypedSelector(selectTimer(terrainId));
  const [remainingTime, setRemainingTime] = useState(waitTime);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // This function updates the timer display
    const updateTimer = (startTime: number) => {
      const update = () => {
        if (isUpdating) {
          // Skip this update if the previous update is still executing
          return;
        }

        setIsUpdating(true);
        const elapsed = performance.now() - startTime;
        const remaining = Math.max(waitTime - elapsed, 0);

        setRemainingTime(remaining);

        if (remaining <= 0) {
          // Reset the timer when it reaches 0
          setRemainingTime(waitTime);
        } else {
          setIsUpdating(false);
          requestAnimationFrame(update);
        }
      };

      requestAnimationFrame(update);
    };

    if (timer && timer.isLocked) {
      const startTime = performance.now() - (waitTime - remainingTime);
      setIsUpdating(false);
      updateTimer(startTime);
    }
  }, [timer, waitTime, remainingTime, isUpdating]);

  return (
    <div>{FormatMsToTime(remainingTime)}</div>
  );
};

export default TerrainTimer;
