import React from 'react'
import styled,{css} from 'styled-components'
import {lighten,darken} from 'polished'

const ColorStyles = css`
    ${({theme,color})=>{
        const selected = theme.palette[color]
        return css`
            background:${selected};
            &:hover{
                background:${lighten(0.1,selected)}
            }
            &:active{
                background:${darken(0.1,selected)}
            }
        `
    }}
`;

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

const SizeStyles = css`
    ${({size})=>css`
        height:${sizes[size].height};
        font-size:${sizes[size].fontSize};
    `}
`

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
  ${SizeStyles}

  /* 색상 */
  ${ColorStyles}

  /* 기타 */
  &+&{
      margin-left:1rem;
  }
`;

function SCButton({children,color,size, ...rest}){
    return (
        <StyledButton color={color} size={size} {...rest}>{children}</StyledButton>
    )
}

SCButton.defaultProps={
    color:'blue',
    size:'medium'
}

export default SCButton