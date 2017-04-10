import {
    cyan500, cyan700,
    pinkA200,
    grey100, grey300, grey400, grey500,
    white, darkBlack, fullBlack, indigo50
} from 'material-ui/styles/colors';
import { fade, darken } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';
import typography from  'material-ui/styles/typography';
let palette = {
        primary1Color: cyan500,
        primary2Color: cyan700,
        primary3Color: grey400,
        accent1Color: pinkA200,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: cyan500,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
        backgroundColor: '#FC3868'
    }
export default {
    spacing: spacing,
    fontFamily: 'Open Sans, sans-serif',
    palette: palette,
    button: {
        height: 40,
        minWidth: 130,
        iconButtonSize: spacing.iconSize * 2
    },
    raisedButton: {
      color: palette.alternateTextColor,
      textColor: "#000",
      primaryColor: "#fff",
      primaryTextColor: "#474e65",
      secondaryColor: '#FC3868',
      secondaryTextColor: "#fff",
      disabledColor: darken(palette.alternateTextColor, 0.1),
      disabledTextColor: fade(palette.textColor, 0.3),
      fontSize: 16,
      fontWeight: 500,
    },
    ripple: {
        color: "#000"
    },

};
export const customStyles ={

    alterBtnStyle : { 
        labelStyle:{ 
            color: '#474e65', 
            fontWeight: 600, 
            fontSize: 15 
        },
        buttonStyle: { 
            borderRadius: "20px", 
            zIndex: 1, 
            overflow: 'hidden' 
        },
        style: {
            borderRadius: "20px", 
        }
    }

}