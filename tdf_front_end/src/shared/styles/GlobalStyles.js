import { createGlobalStyle } from 'styled-components';
import { setColor, setFont, maxScreenWidth, minScreenWidth } from '../../styles';
const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Archivo&display=swap');
@import url('https://fonts.googleapis.com/css?family=Arvo|Lato:400,700&display=swap');
@import url('https://fonts.googleapis.com/css?family=Courier+Prime:400,700&display=swap');

*,
*::after,
*::before {
	margin: 0;
	padding: 0;
	box-sizing: inherit;
}
html {
  font-size: 62.5%;
  
}

body{
  box-sizing: border-box;
  color:${setColor.mainBlack};
  font-family: ${setFont.main};
  min-width: ${minScreenWidth}px;
  max-width: ${maxScreenWidth}px;
}

section, article, aside {
  font-size: 1rem;
}

h1 {
  font-size: 3rem;
  margin: 0.67rem 0;
}

h2 {
  font-size: 2rem;
  margin: 0.67rem 0;
}

h3 {
  font-size: 1.5rem;
  margin: 0.67rem 0;
}

`;

export default GlobalStyles;
