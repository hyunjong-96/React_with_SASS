import React from 'react'
import classNames from 'classnames'
import './Button.scss'

function Button({children,size,color,outline,fullWidth,...reset}){
    return (<button className={classNames('Button',size,color,{outline,fullWidth})}
    {...reset}
    >{children}</button>)
}

Button.defaultProps = {
    size: 'medium',
    color:'blue'
  };

export default Button