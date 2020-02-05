import { createGlobalStyle } from 'styled-components';
import { setColor, setFont, maxScreenWidth, minScreenWidth } from '../../styles';
const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Archivo&display=swap');
@import url('https://fonts.googleapis.com/css?family=Arvo|Lato:400,700&display=swap');
@import url('https://fonts.googleapis.com/css?family=Courier+Prime:400,700&display=swap');

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}
html, body{
  color:${setColor.mainBlack};
  font-family: ${setFont.main};
  min-width: ${minScreenWidth}px;
  max-width: ${maxScreenWidth}px;
}
h1{
  font-size:3em;line-height:1.2;margin-bottom:0.5em
}
h2{
  font-size:2em;margin-bottom:0.75em
}
h3{
  font-size:1.5em;line-height:1;margin-bottom:1em
}
h4{
  font-size:1.2em;line-height:1.2;margin-bottom:1.25em;font-weight:bold;
}
h5{
  font-size:1em;margin-bottom:1.5em;font-weight:bold;
}
h6{
  font-size:1em;font-weight:bold;
}
p{
  line-height:1.5;margin:0 0 1.5rem 0;
}
`;

export default GlobalStyles;
