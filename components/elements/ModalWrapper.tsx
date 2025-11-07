import { TranslationKey } from "@/lib/i18n";
import { useEffect, useRef } from "react";
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { ModalHeader } from "./ModalHeader";

interface ModalWrapperProps {
  visible: boolean;
  onClose: () => void;
  title: TranslationKey;
  children: React.ReactNode;
}

export function ModalWrapper({
  visible,
  onClose,
  title,
  children,
}: ModalWrapperProps) {
  const backdropAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(backdropAnim, {
        toValue: 1,
        duration: 200,
        delay: 220,
        useNativeDriver: false,
      }).start();
    } else {
      backdropAnim.setValue(0);
    }
  }, [visible, backdropAnim]);

  const backgroundColor = backdropAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.3)"],
  });

  const handleClose = () => {
    // If keyboard is visible, dismiss it instead of closing modal
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    } else {
      onClose();
    }
  };

  const headerPress = () => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <Animated.View style={{ backgroundColor, flex: 1 }}>
        <Pressable
          className="flex-1 items-center justify-end xl:justify-center"
          onPress={handleClose}
        >
          <TouchableWithoutFeedback onPress={headerPress}>
            <KeyboardAvoidingView
              className="max-h-[90%] w-full cursor-default rounded-t-3xl bg-white dark:bg-gray-800 xl:max-w-2xl xl:rounded-b-3xl"
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <ModalHeader title={title} onClose={onClose} />

              <ScrollView className="cursor-auto px-6 py-4">
                {children}
              </ScrollView>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </Pressable>
      </Animated.View>
    </Modal>
  );
}
