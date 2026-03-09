import React, { useEffect, useRef, useState } from 'react';
import { Pressable, SafeAreaView, View, } from 'react-native';
import { createAnimatedComponent } from 'react-native-reanimated';
import EmojiView from '../EmojiView';
import { useReaction } from './hooks';
import styles from './styles';
const AnimatedView = createAnimatedComponent(View);
const ReactionView = (props) => {
    const { children, touchableProps, itemIndex = 0, onPress = () => { }, disabled = false, onLongPress = () => { }, onShowDismissCard, } = props;
    const [showPopUpCard, setShowPopUpCard] = useState(false);
    const [viewHeight, setViewHeight] = useState(0);
    const [touchRelease, setTouchRelease] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [emojiViewCoordinates, setEmojiViewCoordinates] = useState({
        width: 0,
        height: 0,
        x: 0,
        y: 0,
    });
    const rootRef = useRef(null);
    const { setCurrentEmoji, showTopEmojiCard, setMainViewY, setMainViewX, mainViewX, showCardPosition, setMainViewWidth, mainViewY, emojiSize, isLongPress, isSinglePress, width: screenWidth, showCardInCenter, panResponder, position, } = useReaction(props);
    const onPressHandler = () => {
        (rootRef === null || rootRef === void 0 ? void 0 : rootRef.current) &&
            (rootRef === null || rootRef === void 0 ? void 0 : rootRef.current.measureInWindow((x, y, width) => {
                setMainViewX(prev => (prev === 0 ? x : prev));
                setMainViewY(y);
                setMainViewWidth(width);
                setCurrentEmoji(0);
                setShowPopUpCard(!showPopUpCard);
            }));
    };
    const subContainer = [
        styles.subContainer,
        showTopEmojiCard ? { top: viewHeight } : { bottom: viewHeight - 10 },
        showCardPosition > 0
            ? { left: showCardInCenter ? -(screenWidth / 2) : 0 }
            : { right: mainViewX + showCardPosition },
    ];
    const hoverIndex = showTopEmojiCard ? -itemIndex : 1;
    const checkTouchRelease = position &&
        position > emojiViewCoordinates.x &&
        position <= emojiViewCoordinates.width + emojiViewCoordinates.x;
    const onStartShouldSetResponder = () => {
        setShowPopUpCard(!showPopUpCard);
        return true;
    };
    const isCardOpen = mainViewX > 0 && showPopUpCard === true;
    useEffect(() => {
        onShowDismissCard && onShowDismissCard(showPopUpCard);
    }, [onShowDismissCard, showPopUpCard]);
    return (React.createElement(SafeAreaView, { ref: rootRef, style: [{ zIndex: hoverIndex, elevation: hoverIndex }] },
        isCardOpen && (React.createElement(AnimatedView, { style: subContainer },
            React.createElement(EmojiView, { onStartShouldSetResponder: onStartShouldSetResponder, getEmojiViewCoordinates: coordinates => {
                    setEmojiViewCoordinates(coordinates);
                }, ...{
                    x: mainViewX,
                    y: mainViewY,
                    isModal: false,
                    setShowPopUpCard,
                    showPopUpCard,
                    emojiSize,
                    position,
                    panResponder,
                    directTouchRelease: touchRelease,
                    directTouchLoad: loaded,
                    ...props,
                } }))),
        React.createElement(View, { onLayout: event => {
                const { height } = event.nativeEvent.layout;
                setViewHeight(height);
            }, onTouchStart: () => {
                setLoaded(true);
                setTouchRelease(false);
            }, onTouchEnd: () => {
                setLoaded(false);
                checkTouchRelease && setTouchRelease(true);
            }, ...panResponder.panHandlers }, React.isValidElement(children) && (React.createElement(Pressable, { ...touchableProps, hitSlop: { top: 20, left: 20, right: 20, bottom: 20 }, disabled: disabled, onLongPress: () => {
                isLongPress ? onPressHandler() : !isSinglePress && onPress();
                onLongPress();
            }, onPress: () => {
                isSinglePress ? onPressHandler() : !isLongPress && onPress();
                onPress();
            } }, children)))));
};
export default ReactionView;
//# sourceMappingURL=ReactionView.js.map