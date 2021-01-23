import React,{useState, useEffect} from 'react'
import styled,{keyframes} from 'styled-components'
import Button from './SCButton'

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
        transform : translateX(10px);
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
`

const ButtonGroup = styled.div`
    margin-top : 3rem;
    display:flex;
    justify-content
`

const ShortMarginButton = styled(Button)`
    &+&{
        margin-left:0.5rem;
    }
`

function Dialog({children,title,confirmText,cancelText,onConfirm,onCancel,visible}){
    return(
        <DarkBackground>
            <DialogBlock>
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