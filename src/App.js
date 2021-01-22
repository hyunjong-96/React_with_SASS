import './App.scss';
import Button from './component/Button'

function App() {
  return (
    <div className="App">
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
  );
}

export default App;
