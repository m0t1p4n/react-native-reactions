import React from 'react';
import { Image } from 'react-native';
import { createAnimatedComponent } from 'react-native-reanimated';
import { moderateScale } from '../../theme';
import styles from './styles';
const AnimatedImage = createAnimatedComponent(Image);
const EmojiImage = ({ emojiElementStyle, emojiSize = 0, ...rest }) => {
    const imageStyle = [
        styles.img,
        emojiElementStyle,
        { width: moderateScale(emojiSize), height: moderateScale(emojiSize) },
    ];
    return React.createElement(AnimatedImage, { style: imageStyle, ...rest });
};
export default EmojiImage;
//# sourceMappingURL=index.js.map