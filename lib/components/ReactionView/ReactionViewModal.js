import React, { createRef, useEffect, useImperativeHandle, useRef, useState, } from 'react';
import { Pressable, View } from 'react-native';
import { createAnimatedComponent } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { reactionModalRef } from '../ReactionModal';
import { useReaction } from './hooks';
export const getCoordinatesRef = createRef();
const AnimatedView = createAnimatedComponent(View);
const AnimatedPressable = createAnimatedComponent(Pressable);
const ReactionViewModal = ({ touchableProps, ...props }) => {
    const { children, onPress = () => { }, disabled = false, onLongPress = () => { }, } = props;
    const rootRef = useRef(null);
    const contentHeightRef = useRef(0);
    const contentyRef = useRef(0);
    const [touchRelease, setTouchRelease] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [emojiViewCoordinates, setEmojiViewCoordinates] = useState({
        width: 0,
        height: 0,
        x: 0,
        y: 0,
    });
    const { emojiSize, isLongPress, isSinglePress, panResponder, position } = useReaction(props);
    useImperativeHandle(getCoordinatesRef, () => ({
        sendCoordinates: coordinates => {
            setEmojiViewCoordinates(coordinates);
        },
    }));
    const onPressHandler = () => {
        (rootRef === null || rootRef === void 0 ? void 0 : rootRef.current) &&
            (rootRef === null || rootRef === void 0 ? void 0 : rootRef.current.measureInWindow((x, y, width) => {
                var _a;
                reactionModalRef.current &&
                    ((_a = reactionModalRef.current) === null || _a === void 0 ? void 0 : _a.show({
                        x,
                        y,
                        width,
                        contentHeight: contentHeightRef.current,
                        emojiSize,
                        directTouchRelease: touchRelease,
                        directTouchLoad: loaded,
                        position,
                        panResponder,
                        ...props,
                    }));
                contentyRef.current = y;
            }));
    };
    useEffect(() => {
        var _a;
        reactionModalRef.current &&
            ((_a = reactionModalRef.current) === null || _a === void 0 ? void 0 : _a.sendUpdatedValues({
                directTouchRelease: touchRelease,
                directTouchLoad: loaded,
                position,
                panResponder,
                ...props,
            }));
    }, [loaded, panResponder, position, props, touchRelease]);
    const checkTouchRelease = position &&
        position > emojiViewCoordinates.x &&
        position <= emojiViewCoordinates.width + emojiViewCoordinates.x;
    return (React.createElement(AnimatedView, { ref: rootRef, onLayout: event => {
            const { height } = event.nativeEvent.layout;
            contentHeightRef.current = height;
        }, onTouchStart: () => {
            setLoaded(true);
            setTouchRelease(false);
        }, onTouchEnd: () => {
            setLoaded(false);
            checkTouchRelease && setTouchRelease(true);
        }, ...panResponder.panHandlers }, React.isValidElement(children) && (React.createElement(AnimatedPressable, { ...touchableProps, hitSlop: { top: 20, left: 20, right: 20, bottom: 20 }, disabled: disabled, onLongPress: () => {
            isLongPress ? onPressHandler() : !isSinglePress && onPress();
            onLongPress();
        }, onPress: () => {
            isSinglePress ? onPressHandler() : !isLongPress && onPress();
            onPress();
        } }, children))));
};
export default ReactionViewModal;
//# sourceMappingURL=ReactionViewModal.js.map