import React, { memo, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createAnimatedComponent, useAnimatedStyle } from 'react-native-reanimated';
import { moderateScale, verticalScale } from '../../theme';
import { isValidUrl } from '../../utils';
import EmojiImage from '../EmojiImage';
import { useEmojiItem } from './hooks';
import styles from './styles';
const AnimatedText = createAnimatedComponent(Text);
const AnimatedTouchableOpacity = createAnimatedComponent(TouchableOpacity);
const AnimatedView = createAnimatedComponent(View);
const EmojiButton = ({ emojiData, emojiStyle, emojiKey = 'emoji', emojiSize = 28, }) => {
    var _a, _b;
    const emoji = emojiData === null || emojiData === void 0 ? void 0 : emojiData[emojiKey];
    const isNumber = typeof emoji === 'number';
    const isValidEmement = React.isValidElement(emoji);
    const emojiElementStyle = [
        { fontSize: moderateScale(emojiSize) },
        emojiStyle,
        (_b = (_a = emoji === null || emoji === void 0 ? void 0 : emoji.props) === null || _a === void 0 ? void 0 : _a.style) !== null && _b !== void 0 ? _b : {},
    ];
    if (isValidEmement) {
        return React.cloneElement(emoji, {
            style: emojiElementStyle,
        });
    }
    else if (isValidUrl(emoji) || isNumber) {
        return (React.createElement(EmojiImage, { ...{ emojiElementStyle, emojiSize }, source: isNumber ? emoji : { uri: emoji } }));
    }
    else {
        return React.createElement(AnimatedText, { style: [styles.emojiText, emojiElementStyle] }, emoji);
    }
};
const EmojiItem = (props) => {
    const { data, onEmojiPress, titleStyle, titleBoxStyle, emojiContainerStyle, showTopEmojiCard, emojiKey, emojiStyle, emojiSize, isTouchRelease, isModal = true, setShowPopUpCard = () => { }, onTap = () => { }, loaded, onEmojiCloseModal = () => { }, setTouchRelease = () => { }, } = props;
    const { titlePosition, onLayout, scaled, childRef, emojiAnimatedScaled, wavedEmoji, } = useEmojiItem(props);
    const labelStyle = useAnimatedStyle(() => ({
        position: 'absolute',
        backgroundColor: styles.titleBox.backgroundColor,
        paddingVertical: styles.titleBox.paddingVertical,
        borderRadius: styles.titleBox.borderRadius,
        paddingHorizontal: styles.titleBox.paddingHorizontal,
        transform: [
            { scale: scaled ? 1.0 : 0 },
            { translateX: titlePosition },
            { perspective: 1000 },
        ],
        opacity: scaled ? 1.0 : 0,
        top: showTopEmojiCard ? verticalScale(-30) : verticalScale(70),
        ...(titleBoxStyle || {}),
    }));
    useEffect(() => {
        const getEmoji = scaled ? data : null;
        isTouchRelease && (isModal ? onEmojiCloseModal() : setShowPopUpCard(false));
        return () => {
            isTouchRelease && getEmoji && onTap(getEmoji);
            setTouchRelease(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, scaled, isTouchRelease]);
    return (React.createElement(React.Fragment, null,
        scaled && (data === null || data === void 0 ? void 0 : data.title) && (React.createElement(AnimatedView, { style: labelStyle },
            React.createElement(AnimatedText, { style: [styles.title, titleStyle] }, data === null || data === void 0 ? void 0 : data.title))),
        React.createElement(AnimatedView, { style: [styles.root, emojiContainerStyle], onLayout: onLayout },
            React.createElement(AnimatedTouchableOpacity, { hitSlop: { bottom: 30, top: 30 }, ref: childRef, onPress: onEmojiPress },
                React.createElement(AnimatedView, { style: loaded ? emojiAnimatedScaled : wavedEmoji },
                    React.createElement(EmojiButton, { emojiData: data, ...{ emojiStyle, emojiKey, emojiSize } })))))
    );
};
export default memo(EmojiItem);
//# sourceMappingURL=index.js.map