import styled, { keyframes } from 'styled-components';

export const loaderSpinner = keyframes`
    0% {
        WebkitTransform: rotate(0);
    }
    100% {
        WebkitTransform: rotate(-360deg);
    }
`;

/* 
    !   REF
    *   http://jsfiddle.net/8k2NV/2/
*/

export const styleLoading = {
    "width": "100%",
    "height": "100%",
    "position": "fixed",
    "top": "0",
    "right": "0",
    "bottom": "0",
    "left": "0",
    "backgroundColor": "rgba(0,0,0,.5)"
}
export const loadingWheel = {
    "width": "20px",
    "height": "20px",
    "marginTop": "-40px",
    "marginLeft": "-40px",
    "position": "absolute",
    "top": "50%",
    "left": "50%",
    "borderWidth": "30px",
    "borderRadius": "50%",
    "borderStyle": "double",
    "borderColor": "#ccc transparent",
    "animation": "loaderSpinner 1s linear infinite",
    "WebkitAnimation": "loaderSpinner 1s linear infinite",
};

export const styleLoadingWheel = {
    "borderStyle": "double",
    "borderColor": "#ccc transparent"
};
