import { useEffect, useCallback } from 'react';
import { Platform, BackHandler } from 'react-native';

interface Options {
  onBack?: () => void;
  onForward?: () => void;
  enabled?: boolean;
}

/**
 * Handles mouse side buttons (button 4 = back, button 5 = forward)
 * and Android hardware back button.
 */
export function useMouseSideButton({ onBack, onForward, enabled = true }: Options) {
  const handlePointerDown = useCallback(
    (e: PointerEvent) => {
      if (!enabled) return;
      // Mouse button 3 = back (button 4 on some mice), button 4 = forward
      if (e.button === 3 && onBack) {
        e.preventDefault();
        onBack();
      } else if (e.button === 4 && onForward) {
        e.preventDefault();
        onForward();
      }
    },
    [onBack, onForward, enabled]
  );

  useEffect(() => {
    if (Platform.OS === 'web') {
      window.addEventListener('pointerdown', handlePointerDown);
      return () => window.removeEventListener('pointerdown', handlePointerDown);
    }
  }, [handlePointerDown]);

  // Android hardware back button
  useEffect(() => {
    if (Platform.OS !== 'android' || !enabled || !onBack) return;
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      onBack();
      return true;
    });
    return () => handler.remove();
  }, [onBack, enabled]);
}
