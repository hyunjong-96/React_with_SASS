# [리액트 컴포넌트 스타일링하기]

# 1.시작하기

* create-react-app styling-with-sass
* cd styling-with-sass
* npm install node-sass

# [Error]

* node-sass@5.0.0 버전을 다운 받으면 최근에 이슈가 있다는 에러 발생

  [해결법] node-sass를 다운그레이드하자

  ```
  npm uninstall node-sass
  npm install node-sass@4.14.1
  or
  rm -rf node_modules package-lock.json
  npm install --saveDev node-sass@4.14.1
  npm install
  ```

  

# 2.버튼만들기

## [1]버튼 생성,사이즈

```
npm install classNames
```

classNames 라이브러리를 사용함으로써  조건부로 CSS클래스를 넣어주는것보다 손쉽게 문자열을 전달할수 있다

```
classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'
classNames(['foo', 'bar']); // => 'foo bar'

// 동시에 여러개의 타입으로 받아올 수 도 있습니다.
classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'

// false, null, 0, undefined 는 무시됩니다.
classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'
```

[예시]

```jsx
import className from 'classnames'
function Button({children,color,size}){
	return <button className={classNames('Button',size,color)}></button>
}
```

[component/ Button.js]

```jsx
import React from 'react'
import classNames from 'classnames'
import './Button.scss'

function Button({children,size}){
    return <button className={classNames('Button',size)}>{children}</button>
}

Button.defaultProps = {
    size: 'medium'
  };

export default Button
```

[component/ Button.scss]

```scss
$blue: #228be6;

.Button {
  display: inline-flex;
  color: white;
  font-weight: bold;
  outline: none;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  //사이즈 관리
  &.large{  // == .Button.large
      height:3rem;
      padding-left: 1rem;
      padding-right: 1rem;
      font-size: 1.25rem;
  }
  &.medium{
      height:2.25rem;
      padding-left: 1rem;
      padding-right: 1rem;
      font-size: 1rem;
  }
  &.small{
      height: 1.75rem;
      padding-left: 1rem;
      padding-right:1rem;
      font-size: 1rem;
  }

  background: $blue;
  &:hover {
    background: lighten($blue, 10%); // 색상 10% 밝게
  }

  &:active {
    background: darken($blue, 10%); // 색상 10% 어둡게
  }

  & + & { //== .Button + .Button(버튼이 함께 있다면 우측에있는 버튼에 여백을 설정)
      margin-left:1rem;
  }
}
```

* **&** 는 상위 className을 뜻함
  ex) &.large == .Button.large
* **& + &**  는 .Button + .Button를 의미하며 Button이 붙어있을때 각 element의 사이값을 조절
* **& :** 는 :뒤에 이벤트를 뜻함
  ex) &:hover 는 .Button에 커서를 올려놨을때의 상태를 설정
  ex) &:active 는 .Button을 눌렀을때의 상태를 설정

## [2]버튼 색상

className의 색상마다 버튼을 생성해줄때 

```scss
&.blue{
      background:$blue;
    &:hover{
        background: lighten($blue,10%)
    }
    &:active{
        background: lighten($blue,10%)
    }
  }
  &.gray{
      background:$gray;
    &:hover{
        background: lighten($gray,10%)
    }
    &:active{
        background: lighten($gray,10%)
    }
  }
```

위의 코드처럼 할수 있지만 중복되는 코드가 많다.

이떄는 mixin이라는 기능을 사용한다.

```scss
@mixin button-color($color){
    background : $color;
    &:hover{
      background:lighten($color, 10%)  
    }
    &:active{
        background:darken($color, 10%)
    }
}

.Button{
    ...
    &.blue{
        @include button-color($blue)
    }
    &.gray{
        @include button-color($gray)
    }
}
```

![image-20210122172320750](C:\Users\leehyunjong\AppData\Roaming\Typora\typora-user-images\image-20210122172320750.png)



## [3]outline옵션 만들기

```jsx
function Button({children,size,color,outline}){
    return <button className={classNames('Button',size,color,{outline})}>{children}</button>
}
```

props의 online을 중괄호에 넣음으로써 true일때만 button에 outline CSS클래스가 적용된다.
props에 outline이 들어오지않는다면 false

```scss
@mixin button-color($color){
    background: $color;
    &:hover{
        background: lighten($color, 10%);
    }
    &:active{
        background: darken($color, 10%);
    }
    &.outline{ //outline이 true인 경우
        color:$color;//폰트색
        background: none;//배경색
        border: 1px solid $color;//테두리
        &:hover{//버튼에 커서 올려놨을때
            background:$color;
            color:white
        }
    }
}
```

![image-20210122172252673](C:\Users\leehyunjong\AppData\Roaming\Typora\typora-user-images\image-20210122172252673.png)

## [4]fullWidth

outline과 마찬가지로 props로 fullWidth의 유무를 확인하고 버튼의 크기조절

```scss
.Button{
    ...
    &.fullWidth{
        width:100%;//한 element당 넓이(세로)가 상위 element의 100%차지
        justify-content:center;//플렉스 요소의 수평 방향 정렬 방식(텍스트의 위치가 변경됨).
        //반대로 align-items속성은 플랙스 요소의 수직 방향 정렬 방식.
    }
}
```

![image](https://user-images.githubusercontent.com/57162257/105465547-64460800-5cd6-11eb-8b2a-d82674941d1b.png)



## [4]...rest props 전달하기

```jsx
function Button({children,size,color,outline,fullWidth,onClick,onMouseMove}){
    return (<button className={classNames('Button',size,color,{outline,fullWidth})}
    onClick={onClick}
	onMouseMove={onMouseMove}
    >{children}</button>)
}
```

위와 같이 이벤트를 하위컴포넌트에서 전달받기 위해서 props에 각각 전달하는 방법도 있지만 굉장히 번거로운 작업이 될수있다.

이떄 spread와 rest를 사용해준다.

[Button.js]

```jsx
function Button({children,size,color,outline,fullWidth,{...rest]}}){
    return (<button className={classNames('Button',size,color,{outline,fullWidth})}
    {...rest}
    >{children}</button>)
}
```

...rest를 사용해서 우리가 지정한 props를 제외한 값들을 rest라는 객체에 모아주고, <button> {...rest}를 해주면, rest안에 있는 객체안에 있는 값들을 모두 <button>태그에 설정에 해준다.

[App.js]

```jsx
return(
	<div className="App">
      <div className="buttons">
        <Button size="large" onClick={() => console.log('클릭됐다!')} onMouseMove={(e)=>console.log(e.clientX)}>
          BUTTON
        </Button>
        <Button onMouseMove={(e)=>(console.log(e.clientX))}>BUTTON</Button>
        <Button size="small">BUTTON</Button>
      </div>
)
```

첫번째 버튼을 클릭하고 버튼위에서 마우스를 움직이면 이벤트들이 활성화된다.

두번쨰 버튼위에서 마우스를 움직이면 이벤트들이 활성화된다.

# 3.em, rem

## [1]em

em은 상위 요소를 기준으로 크기는 정함.

ex) font-size : 1.5em은 글자 크기를 상위 요소 크기의 1.5배로 하겠다.

```css
<style>
html {font-size : 16px}
body {font-size : 1.5em}
.a {font-size : 2.0em}
</style>
```

위의 코드에서 body의 상위요소인 html의 폰트사이즈가 16px이면 16*1.5=24px
문단요소(a)의 크기는 상위 요소인 body요소의 크기의 2배인 48px

## [2]rem

rem단위는 문서의 최상위 요소인 html요소의 크기의 몇 배인지로 크기를 정한다.

위의 코드로 비교하면
body의 크기는 16 * 1.5 = 24px
문단 요소의 크기는 16 * 2 = 32px

**참고로 웹브라우저에서 설정한 html요소의 크기는 보통 16px** 

# 4. CSS Module

리액트 프로젝트에서 컴포넌트를 스타일링 할 떄 CSS Module이라는 기술을 사용하면, CSS클래스가 중첩되는 것을 완벽하게 방지할수 있다.

사용하는 경우

* 레거시 프로젝트에 리엑트를 도입하게 될떄.
* 클래스 이름 짓는 규칙을 정하기 힘든 상황이거나 번거러울때

CSS파일의 확장자를 .module.css로 하면된다.

[Box.module.css]

```css
.Box{
	background: black;
    color:white;
    padding: 2rem;
}
```

[Box.js]

```jsx
import React from "react"
import styles from "./Box.module.css"
function Box(){
    return <div className={styles.Box}>{styles.Box}</div>
}
export default Box
```

className을 설정할 때에는 styles.Box 이렇게 import로 불러온 styles객체 안에 있는 값을 참조해야 한다.

그리고 css module로 작성하게 되면 클래스 이름에 대하여 고유한 이름들이 만들어지기 떄문에, css클래스 이름이 관계없는 곳에서 사용한 CSS클래스 이름과 중복되는 일이 없다.

## *css 클래스 네이밍 규칙

* 컴포넌트의 이름은 다른 컴포넌트랑 중복되지 않게 한다.
* 컴포넌트의 최상단 CSS 클래스는 컴포넌트의 이름과 일치시킨다.(.Button)
* 컴포넌트 내부에서 보여지는 CSS클래스는 CSS Selector를 잘 활용한다.(.MyForm .my-input)

클래스 네이밍 규칙을 만들고 따르기 싫다면 CSS Module을 사용하면 된다.

## [1]CSS module 시작하기

CSS Module은 별로도 설치할 라이브러리는 없다.

이 기능은 webpack에서 사용하는 css-loader에서 지원함. CRA로 만든 프로젝트에는 이미 적용이 되어있다.

[CheckBox.module.css]

```css
.checkBox{
    display: flex;
    align-items: center;
}

.checkBox label{
    cursor: pointer;
}

.checkBox input{
    width: 0;
    height: 0;
    position: absolute;/*본문을 중심으로 위치해있음*/
    opacity:0; /*투명도*/
}

.checkbox span{
    font-size: 1.125rem;
    font-weight: bold;
}

.icon{
    display: flex;
    align-items: center;
    /*아이콘의 크기는 폰트 사이즈로 조정 가능*/
    font-size: 2rem;
    margin-right: 0.25rem;
    color: #adb5bd;
}

.checked{
    color: #339af0;
}
```

[App.js]

```jsx
import React,{useState} from 'react'
import CheckBox from './component/CheckBox'

function App(){
    const [check,setCheck] = useState(false)
    const onChange =(e)=>{
        setCheck(e.target.checked)
    }
    
    return(
    	div>
      <CheckBox onChange={onChange} checked={check}>
        다음 약관에 모두 동의
      </CheckBox>
      <p>
        <b>check : </b>
        {check ? 'true' : 'false'}
      </p>
    </div>
    )
}
```

[CheckBox.js]

```jsx
import React from 'react'
import {MdCheckBox, MdCheckBoxOutlineBlank} from 'react-icons/md'
import styles from '../modules/CheckBox.module.css'

function CheckBox({children, checked, ...rest}){
    return(
        <div className={styles.checkBox}>
            <label>
                <input type="checkbox" checked={checked} {...rest}/>
                <div className={styles.icon}>{checked ? <MdCheckBox className={styles.checked}/> : <MdCheckBoxOutlineBlank/>}</div>
            </label> {//label 요소에 묶여있어서 input과 icon이 포함된 div요소가 함께 클릭된다.}
            <span>{children}</span>
        </div>
    )
}

export default CheckBox
```

## *CSS Module의 객체값 조회

* 클래스 이름에 - 가 들어있으면 styles['my-class']

* 클래스 이름이 여러개있는경우

  ```jsx
  import React from 'react'
  import {MdCheckBox, MdCheckBoxOutlineBlank} from 'react-icons/md'
  import styles from '../modules/CheckBox.module.css'
  import classNames from 'classnames/bind' //classnames 모듈 설치
  
  const cx = classNames.bind(styles)//classnames의 bind메소드 사용
  
  function CheckBox({children, checked, ...rest}){
      return(
          <div className={cx('checkBox')}>
              <label>
                  <input type="checkbox" checked={checked} {...rest}/>
                  <div className={cx('icon')}>{checked ? <MdCheckBox className={cx('checked')}/> : <MdCheckBoxOutlineBlank/>}</div>
              </label>
              <span>{children}</span>
          </div>
      )
  }
  
  export default CheckBox
  ```

  위와 같이 classnames모듈을 다운받고 bind메소드를 사용해준다.

  여러개의 CSS클래스를 사용해야할 경우는

  ```javascript
  cx('one', 'two')
  cx('my-component', {
    condition: true
  })
  cx('my-component', ['another', 'classnames'])
  ```

## [2]CSS Module to Sass

.module.scss로 바꿔주기만 하면 된다.

대신 node-sass는 꼭 설치

* 전역적 클래스이름을 사용하고자할떄

  ```scss
  :global {
    .my-global-name {
  
    }
  }
  ```

* 특정 클래스에서만 고유 이름을 만들어서 사용하고자할 경우

  ```scss
  :local {
    .make-this-local {
  
    }
  }
  ```



# 5.Styled-Components

## [1]Tagged Template Literal

(styled-components가 내부적으로 어떻게 작동하는지 이해할수있음.)

문자열 조합을 더욱 쉽게 할 수 잇게 해주는 ES6문법

```javascript
const red = "빨간색";
const blue = "파란색";
function favoriteColors(text, ...values){
    return texts.reduce((result, text, i)=>`${result}${text}${values[i]} ? `<b>${values[i]}</b>` : ''} `,'');
}

favoriteColors`제가 좋아하는 색은 ${red}과 ${blue}입니다.`
//제가 좋아하는 색은 <b>빨간색</b>과 <b>파란색</b>입니다.
```

위와 같은 코드.. 복잡해보이지만 일단은 넘어가자..ㅎ

styled-components에서는 이런 문법을 사용해서 컴포넌트의 props를 읽어온다.

```jsx
const StyledDiv = styled`background : ${props => props.color}`
```

위와 같은 코드를 보면 ${}을 통해 함수를 넣어줬다면, 해당 함수를 사용해 줄 수도 있다.

```jsx
function sample(texts, ...fns) {
  const mockProps = {
    title: '안녕하세요',
    body: '내용은 내용내용 입니다.'
  };
  return texts.reduce((result, text, i) => `${result}${text}${fns[i] ? fns[i](mockProps) : ''}`, '');
}
sample`
  제목: ${props => props.title}
  내용: ${props => props.body}
`
/*
"
  제목: 안녕하세요
  내용: 내용은 내용내용 입니다.
"
*/
```

으으ㅡ어어어어어어어어.............................

## [2]styled-components 사용하기

* npm install styled-components

```scss
const StyledButton = styled.button`
  /* 공통 스타일 */
  
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  /* 크기 */
  height:2rem;
  font-size:1rem;

  /* 색상 */
  background: #228be6;
  &:hover {
    background: #339af0;
  }
  &:active {
    background: #1c7ed6;
  }

  /* 기타 */
  &+&{
      margin-left:1rem;
  }
`;
```

element요소는 styled.button과 같이 styled뒤에 작성해주면 된다.

## *polished

sass에서 lighten()또는 darken()과 같은 유틸함수를 사용하기 위해서는 polished라는 라이브러리를 사용

```
npm install polished
```

```scss
import {lighten,daren} from 'polisehed'

const StyledButton = styeld.button`
	...

	background: #228be6;
  &:hover {
    background: ${lighten(0.1,'#228be6')};
  }
  &:active {
    background: ${darken(0.1,'#228be6')}
  }
`
```

## *ThemeProvider

 ThemeProvider라는 기능을 사용해서 styled-components로 만드는 모든 컴포넌트에서 조회하여 사용할 수 있는 전역적인 값을 설정.

```jsx
import styled,{ThemeProvider} from 'styled-component'

function App(){
    ...
    
    return(
    	<ThemeProvider
            theme={{
                palette:{
                    blue:'#228be6',
          			gray:'#495057',
          			pink:'#f06595'
                }
            }}
            >
        	<AppBlock>
            	<Button>Button</Button>
            </AppBlock>
        </ThemeProvider>
    )
}
```

theme을 설정하면 ThemeProvider내부에 렌더링된 styled-components로 만든 컴포넌트에서 palette를 조회하여 사용할수 있다.

## [3]size, color에 따른 버튼만들기

```scss
import React from 'react'
import styled,{css} from 'styled-components'
import {lighten,darken} from 'polished'

const colorStyles = css`
${({theme,color})=>{
    const selected = theme.palette[color]
    return css`
    	background:${selected}
        &:hover{
            background:${lighten(0.1,selected)}
            }
        &:active{
            background:${darken(0.1,selected)}
            }
    `
    }}
`;

const sizeStyles = css`
${({size})=>{
    height:sizes[size].height; 
    font-size:sizes[size].fontSize;
    }}
`
const sizes = {
    large:{
        height:'3rem',
        fontSize:'1.25rem'
    },
    medium:{
        height:'2.25rem',
        fontSize:'1rem'
    },
    small:{
        height:'1.75rem',
        fontSize:'0.875rem'
    }
}

const StyledButton = styled.button`
	...

	/*크기*/
	${sizeStyles}
	/*색상*/
	${colorStyles}
	...
`

function Button({children,color,size, ...rest}){
    return(
        <StyledButton color={color} size={size} {...rest}>{children}</StyledButton>
    )
}

Button.defaultProps={
    color:'blue',
	size:'medium'
}
```

## *styled-components버그

버튼간의 건격을 만들어주기 위해 한줄의 버튼에 

```scss
&+&{
	margin-left:1rem;
}
```

추가해주고 fullWidth상태가 들어왔을떄는 위아래의 간격을 띄워주기 위해

```scss
${props=>(
	props.fullWidth &&
	css`
		width:100%;
		justify-content:center;
		&+&{
			margin-left:0;
			margin-top:1rem;
		}
	`
)}
```

을 해줬는데 동일하게 부여된 classname의 margin값이 부여됨(fullWidth일때 margin값이 먹지않음)

이유는 styled-component 5.2.0버전 부터 생긴 버그라고 한다.

[해결]

```
&+&{
	...
}

대신

&:not(:first-child){
	...
}
를 사용해주자.
```

[3]Dialog



[4]트랜지션 구현하기

트랜지션 효과를 적용할떄는 styled-component에서 keyframes라는 유틸을 사용.

### (1)나타나기 구현

```scss
import styled,{keyframes} from 'styled-components'

const fadeIn = keyframes`
from{
    opacity:0;
}
to{
    opacity:1;
}
`

const slidUp = keyframes`
from{
    transform : translateY(200px);
}
to{
    transform:translateY(0px)
}
`
```

fadeIn은 투명도가 0에서 1로 변경

slidUp은 현재 요소가 위치하고 있는곳에서 아래서 200px떨어진 위치에서 현재 위치까지 이동.

```scss
const DarkBackground = styled.div`
	...
	
	animation-duration : 0.25s;
//한 싸이클의 애니메이션이 얼마에 걸쳐 일어날것인지
	animation-timing-function : ease-out;
//중간 상태들의 전환을 어떤 시간간격으로 진행할지 지정
	animation-name : ${fadeIn}
//keyframes유틸을 활용하여 중간 상태를 지정
	animation-fill-mode : forwards;
//애니메이션이 시작되기 전이나 끝나고 난 후 어떤 값이 적용될지 지정

`
```

### (2)사라지기 구현

animate : 현재 트랜지션 효과를 보여주고 있는 중이라는 상태를 의미하는 값.

localVisible : 현재 컴포넌트의 보여짐 상태값

```jsx
function Dialog({...,visible}){
    const [animate, setAnimate] = useState(false)
    const [localVisible, setLocalVisible] = useState(visible)
    
    useEffect(()=>{
        if(localVisible && !visible){//dialog컴포넌트가 보이고 있을때 visible이 false가 된경우
            setAnimate(true)//localVisible이 false가 되어도 dialog컴포넌트가 보일수 있도록 유지시켜줌.
            setTimout(()=>setAnimate(false),250)//visible이 false가 됬을때 250ms뒤에 animate를 다시 false로 상태변화
        }
        setLocalVisible(visible)
    },[visible, localVisible])
        
    if(!localVisible && !animate) return null
    return(
    	...
    )
}
```

사라지기를 구현한후 dialog가 자연스럽게 트랜직션을 통해 사라지는걸 구현하기위해서는

```jsx
import styled,{css,keyframes} from 'styled-components'

const fadeOut = keyframes`
from{
	opacity:1;
}to{
	opacity:0;
}
`
const slidDown = keyframes`
from{
	transform : translateY(0px);
}
to{
	transform : translateY(200px);
}
`

const DarkBackground = styled.div`
	...
	${props=>
	props.disappear && 
      css`
	animate-name:${fadeOut}
`
}
`

const DialogBlock = styled.div`
	...
	${props=>
	props.disappear && 
      css`
	animate-name:${slidDown}
`
}
`

function Dialog({...}){
    ...
    return(
    	<DarkBackground disappear={!visible}>
            <DialogBlock disappear={!visible}>
            </DialogBlock>
        </DarkBackground>
    )
}
```



# *css 속성

* outline : border 바깥 외곽선(요소를 두드러져 보이게 만들기 위함)
* border : 테두리
* border-radius : 테두리의 둥근 정도
  ![image](https://user-images.githubusercontent.com/57162257/105456321-4f627800-5cc8-11eb-8029-72a310a34f2c.png)
* position : element를 배치하는 방법
  https://medium.com/@yeon22/css-css-position-%EC%84%A4%EB%AA%85-f2c0a0b26556
  * static : element에 position을 지정하지 않았을때 기본적으로 적용되는 값.
    static의 경우 top, right, bottom, left, z-index속성들이 아무런 효과를 주지 못한다.
  * relativ : element가 문서의 일반적인 흐름에 따라 배치됨.
    자신의 static위치에서 top,right,bottom,left와 같은 속성에 의한 상대적인(relative) 위치에 배치됨
    아무런 위치 속성을 설정하지 않으면 static과 같은 위치에 배치
    그리고 relative로 지정한 element는 다른 요소들의 위치에 영향을 주지 않는다.
  * absolute : element가 문서의 일반적인 흐름을 따르지 않는다.
    가장 가까이에 위치한 조상element(position : relative)에 대해 상대적 위치로 배치되고 조상element가 없으면 본문(body)을 기준으로 삼고 페이지 스크롤에 따라 움직인다.
  * fixed : absolute와 마찬가지로 element가 문서의 일반적인 흐름에서 제거된다. 대신, 스크린의 뷰포트(viewport)를 기준으로 한 위치에 배치된다. 스크롤되어도 움직이지 않는 고정된 자리를 갖게 된다.(viewport : 웹페이지가 사용자에게 보여지는 영역)
    즉, 스크롤되어도 움직이지 않는 고정된 자리를 갖게된다.
* opacity : 투명도
* transform
  * translate() : translate(x,y)함수는 요소를 왼쪽에서부터 x거리, 위에서부터 x거리만큼 상대적으로 위치를 정함.
  * translateX() : 좌우(수평)의 이동 거리 값을 지정
  * translateY() : 상하(수직)의 이동거리 값을 지정
* animation
  [https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Animations/Using_CSS_animations]

