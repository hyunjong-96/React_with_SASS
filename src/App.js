import React,{useState} from 'react'
import './App.scss';
import Button from './component/Button'

import Box from './component/Box'
import CheckBox from './component/CheckBox'

import styled,{css, ThemeProvider} from 'styled-components'
import SCButton from './component/SCButton'
import Dialog from './component/Dialog';

function App() {
  //CSS Module
  // const [check, setCheck] = useState(false)
  // const onChange = (e) => {
  //   setCheck(e.target.checked)
  // }
//styled-component Test
//   const Circle = styled.div`
//   width: 5rem;
//   height: 5rem;
//   background: ${props => props.color || 'black'};
//   border-radius: 50%;
//   ${props =>
//     props.huge &&
//     css`
//       width: 10rem;
//       height: 10rem;
//     `}
// `;

  const [dialog,setDialog] = useState(false);
  const onClick=()=>{
    setDialog(true)
  }
  const onConfirm = ()=>{
    console.log('확인')
    setDialog(false)
  }
  const onCancel=()=>{
    console.log('취소')
    setDialog(false)
  }

  const AppBlock=styled.div`
  width:512px;
  border:1px solid black;
  margin : 0 auto;
  margin-top : 4rem;
  padding:1rem;
  `;

  const ButtonGroup=styled.div`
  &+&{
    margin-top:1rem;
  }
  `


  return (
    <>
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
      <ButtonGroup>
        <SCButton size='large'>Button</SCButton>
        <SCButton>Button</SCButton>
        <SCButton size='small'>Button</SCButton>
    </ButtonGroup>
    <ButtonGroup>
        <SCButton color='gray' size='large'>Button</SCButton>
        <SCButton color='gray'>Button</SCButton>
        <SCButton color='gray' size='small'>Button</SCButton>
    </ButtonGroup>
    <ButtonGroup>
        <SCButton color='pink' size='large'>Button</SCButton>
        <SCButton color='pink'>Button</SCButton>
        <SCButton color='pink' size='small'>Button</SCButton>
    </ButtonGroup>
    <ButtonGroup>
        <SCButton size='large' outline>Button</SCButton>
        <SCButton color='gray' outline>Button</SCButton>
        <SCButton color='pink' size='small' outline>Button</SCButton>
    </ButtonGroup>
    <ButtonGroup>
        <SCButton fullWidth>Button</SCButton>
        <SCButton color='gray' fullWidth>Button</SCButton>
        <SCButton color='pink' fullWidth onClick={onClick}>삭제</SCButton>
    </ButtonGroup>
    </AppBlock>
    <Dialog
      title="정말로 삭제하시겠습니까?"
      confirmText="삭제"
      cancelText="취소"
      onConfirm={onConfirm}
      onCancel={onCancel}
      visible={dialog}
    >
      데이터를 정말로 삭제하시겠습니까?
    </Dialog>
    </ThemeProvider>
    {/* <Circle color="red" huge/> */}

    {//Sass
    /* <div className="App">
      <div className="buttons">
        <Button size="large" onClick={()=>(console.log('클랙됐다!'))} onDoubleClick={()=>(console.log('두번클릭했다'))}>BUTTON</Button>
        <Button onMouseMove={(e)=>(console.log('마우스이벤트!',e.clientX))}>BUTTON</Button>
        <Button size="small">BUTTON</Button>
      </div>

      <div className="buttons">
        <Button size="large" color="gray">BUTTON</Button>
        <Button color="gray">BUTTON</Button>
        <Button size="small" color="gray">BUTTON</Button>
      </div>

      <div className="buttons">
        <Button size="large" color="pink">BUTTON</Button>
        <Button color="pink">BUTTON</Button>
        <Button size="small" color="pink">BUTTON</Button>
      </div>

      <div className="buttons">
        <Button size="large" color="blue" outline>BUTTON</Button>
        <Button color="gray" outline>BUTTON</Button>
        <Button size="small" color="pink" outline>BUTTON</Button>
      </div>
      
      <div className="buttons">
        <Button size="large" color="blue" fullWidth>BUTTON</Button>
        <Button size="large" color="gray" fullWidth>BUTTON</Button>
        <Button size="large" color="pink" fullWidth>BUTTON</Button>
      </div>
    </div>
    <div>
      <Box/>
    </div> */}
    {//CSS Module
    /* <div>
      <CheckBox onChange={onChange} checked={check}>
        다음 약관에 모두 동의
      </CheckBox>
      <p>
        <b>check : </b>
        {check ? 'true' : 'false'}
      </p>
    </div> */}
    </>
  );
}

export default App;
