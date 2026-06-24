import { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const THRESHOLD = SCREEN_HEIGHT * 0.3;

interface Options {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}

const SPRING_CONFIG = {
  damping: 20,
  stiffness: 250,
  mass: 0.8,
};

export function useDrawerGesture({ onOpen, onClose, isOpen }: Options) {
  const translateY = useSharedValue(isOpen ? 0 : SCREEN_HEIGHT);

  const open = () => {
    translateY.value = withSpring(0, SPRING_CONFIG);
  };

  const close = () => {
    translateY.value = withSpring(SCREEN_HEIGHT, SPRING_CONFIG);
  };

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      if (isOpen) {
        const clamped = Math.max(0, e.translationY);
        translateY.value = clamped;
      } else {
        const clamped = Math.min(0, e.translationY);
        translateY.value = SCREEN_HEIGHT + clamped;
      }
    })
    .onEnd(e => {
      if (isOpen && e.translationY > THRESHOLD) {
        translateY.value = withSpring(SCREEN_HEIGHT, SPRING_CONFIG);
        runOnJS(onClose)();
      } else if (!isOpen && e.translationY < -THRESHOLD) {
        translateY.value = withSpring(0, SPRING_CONFIG);
        runOnJS(onOpen)();
      } else {
        translateY.value = withSpring(isOpen ? 0 : SCREEN_HEIGHT, SPRING_CONFIG);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return { panGesture, animatedStyle, open, close, translateY };
}
