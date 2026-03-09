import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import EmojiItem from '../EmojiItem';
import { useEmojiView } from './hooks';
import { styles } from './styles';
import Animated from 'react-native-reanimated';
const EmojiView = ({ onStartShouldSetResponder, getEmojiViewCoordinates, ...props }) => {
    const { cardStyle, y = 0, items, directTouchRelease, directTouchLoad, panResponder, } = props;
    const [touchRelease, setTouchRelease] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const { currentEmoji, emojiSize, hitSlopHeigth, hitSlopWidth, subContainer, emojiPressHandler, container, } = useEmojiView(props);
    const measureRef = useRef(null);
    const emojiBox = [styles.emojiBox, cardStyle];
    return (React.createElement(Animated.View, { style: [subContainer, container], ...panResponder.panHandlers, onResponderRelease: () => setTouchRelease(true) },
        React.createElement(View, { onStartShouldSetResponder: onStartShouldSetResponder, hitSlop: {
                bottom: hitSlopHeigth,
                top: hitSlopHeigth,
                right: hitSlopWidth,
                left: hitSlopWidth,
            } }),
        React.createElement(Animated.View, { style: emojiBox, ref: measureRef, onLayout: () => {
                var _a;
                (_a = measureRef.current) === null || _a === void 0 ? void 0 : _a.measure((_x, _y, width, height, pageX, pageY) => {
                    const layoutRectangle = {
                        x: pageX,
                        y: pageY,
                        width,
                        height,
                    };
                    getEmojiViewCoordinates && getEmojiViewCoordinates(layoutRectangle);
                });
            }, onTouchStart: () => setLoaded(true), onTouchEnd: () => setLoaded(false) }, items === null || items === void 0 ? void 0 : items.map((item, index) => (React.createElement(EmojiItem, { isTouchRelease: directTouchRelease || touchRelease, index: index, onEmojiPress: () => emojiPressHandler(item), key: item === null || item === void 0 ? void 0 : item.title, data: item, currentPosition: currentEmoji, iconSize: emojiSize, showTopEmojiCard: y > 150, loaded: directTouchLoad || loaded, ...{ setTouchRelease, ...props } }))))));
};
export default EmojiView;
//# sourceMappingURL=index.js.map