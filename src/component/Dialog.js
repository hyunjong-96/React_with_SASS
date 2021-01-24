import React,{useState, useEffect} from 'react'
import styled,{keyframes,css} from 'styled-components'
import Button from './SCButton'

const fadeIn = keyframes`
    from{
        opacity:0;
    }
    to{
        opacity:1;
    }
`

const fadeOut = keyframes`
    from{
        opacity:1;
    }
    to{
        opacity:0;
    }
`

const slidUp = keyframes`
    from{
        transform : translateY(200px);
    }
    to{
        transform : translateY(0px);
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
    position:fixed;
    left:0;
    top:0;
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    background : rgba(0,0,0,0.8);

    /*트랜지션*/
    animation-duration : 0.25s;
    animation-timing-function : ease-out;
    animation-name : ${fadeIn};
    animation-fill-mode : forwards;

    ${props=>
    props.disappear &&
    css`
    animate-name:${fadeOut}
    `
    }
`

const DialogBlock = styled.div`
    width:320px;
    padding:1.5rem;
    background:white;
    border-radius:2px;
    h3{
        margin:0;
        font-size:1.5rem;
    }
    p{
        font-size:1.125rem;
    }

    /*트랜지션*/
    animation-duration:0.25s;
    animation-timing-function:ease-out;
    animation-name:${slidUp};
    animation-fill-mode:forwards;

    ${props=>
    props.disappear &&
    css`
        animation-name:${slidDown}
    `
    }
`

const ButtonGroup = styled.div`
    margin-top : 3rem;
    display:flex;
    justify-content:flex-end;
`

const ShortMarginButton = styled(Button)`
    &+&{
        margin-left:0.5rem;
    }
`

function Dialog({children,title,confirmText,cancelText,onConfirm,onCancel,visible}){
    const [animate, setAnimate] = useState(false) //현재 트랜지션 효과를 보여주고 있는 중이라는 상태를 의미
    const [localVisible, setLocalVisible] = useState(visible) //실제로 컴포넌트가 사라지는 시점을 지연시키기 위한 값
    useEffect(()=>{
        //visible값이 true=>false가 되는 것을 감지
        console.log('userEffect에서의 값',` visible:${visible}, localVisible:${localVisible}, animate:${animate}`)
        if(localVisible && !visible){
            console.log('감지!')
            setAnimate(true)
            setTimeout(()=>setAnimate(false),250)
        }
        setLocalVisible(visible)
    },[visible,localVisible])
    console.log('여기의 값은?',`animate:${animate}/ localVisible:${localVisible}`)
    if(!animate && !localVisible) return null
    return(
        <DarkBackground disappear={!visible}>
            <DialogBlock disappear={!visible}>
                <h3>{title}</h3>
                <p>{children}</p>
                <ButtonGroup>
                    <ShortMarginButton color='gray' onClick={onCancel}>
                        {cancelText}
                    </ShortMarginButton>
                    <ShortMarginButton color='pink' onClick={onConfirm}>
                        {confirmText}
                    </ShortMarginButton>
                </ButtonGroup>
            </DialogBlock>
        </DarkBackground>
    )
}
Dialog.defaultProps={
    confirmText:'확인',
    cancelText:'취소'
}

export default Dialog