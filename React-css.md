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

# *css 속성

* outline : border 바깥 외곽선(요소를 두드러져 보이게 만들기 위함)
* border : 테두리
* border-radius : 테두리의 둥근 정도
  ![image](https://user-images.githubusercontent.com/57162257/105456321-4f627800-5cc8-11eb-8029-72a310a34f2c.png)
* 