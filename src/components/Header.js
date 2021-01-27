import React, { useState } from 'react';

import { css } from '@emotion/react'

const headerStyle = css`
  border-bottom: 1px solid rgb(204, 204, 204);
`

const wrapperStyle = css`
  /* font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; */
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.1); */
  padding: 15px 20px;
  max-width: 1200px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`

const headerLogoStyle = css`
  max-height: 50px;
`

const headerLogoSourceUrl = 'https://montanafreepress.org/wp-content/uploads/2020/05/mtfp-logo-1.png'
const headerLogoLink = 'https://montanafreepress.org'

const menuCss = css`
  border: 1px solid red;
  padding: 0.4em 0;
  
  position: relative;
  text-transform: uppercase;
  line-height: 1.2;
  text-align: center;
`
const dropdownCss = css`
  padding: calc(1rem * .5) 0;
  margin-right: 1em;
  color: #555;
  display: inline-block;
  line-height: 1.25;
  letter-spacing: .075em;
  cursor: pointer;

  font-size: 14px;
  /* font-weight: bold; */

  a {
    color: inherit;

    :hover {
      text-decoration: none;
      opacity: 0.75;
    }
  }
`
const donateCss = css``

const menuButtonCss = css`
  height: 18px;
  /* width: 24px; */
  display: inline-block;
  border: none;
  background: transparent;
  color: inherit;

  :hover {
    background: transparent;
    border: none;
  }
`
const dropdownItemCss = css``

const downArrow = <svg class="svg-icon" width="24" height="24" aria-hidden="true" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path><path fill="none" d="M0 0h24v24H0V0z"></path></svg>

const menuActiveCss = css`
  position: absolute;
  background-color: #444;
  color: white;
  width: 200px;
`

const Header = ({ user, onLogin, onLogout, onCreateAccount }) => (
  <header css={headerStyle}>
    <div css={wrapperStyle}>
      <a href={headerLogoLink}><img css={headerLogoStyle} src={headerLogoSourceUrl}></img></a>
    </div>
    <nav css={menuCss}>
      <Dropdown label="About" items={[
        { label: 'About MTFP', url: '#' },
        { label: 'Contact', url: '#' },
        { label: 'Publish our Stories', url: '#' },
        { label: 'Privacy Policy', url: '#' }
      ]} />
      <Dropdown label="Subscribe" items={[]} />
      <Dropdown label="News" items={[
        { label: 'Agriculture', url: '#' },
        { label: 'Energy', url: '#' },
        { label: 'Environment', url: '#' },
        { label: 'Government', url: '#' },
        { label: 'Health', url: '#' },
        { label: 'Politics', url: '#' },
      ]} />
      <Dropdown label="Projects" items={[
        { label: '2021 Legislature', url: '#' },
        { label: 'COVID-19 pandemic', url: '#' },
        { label: 'The Long Streets Project', url: '#' },
        { label: 'Shared State', url: '#' },
        { label: '2020 Election', url: '#' },
      ]} />
      <Dropdown label="Donate" items={[]} />
    </nav>
  </header>
);

export default Header
// Ref https://codesandbox.io/s/how-to-make-an-extremely-reusable-tooltip-component-with-react-and-nothing-else-7opo3?from-embed=&file=/src/Tooltip.js:140-155
const Dropdown = ({ label, url, items, delay=400 }) => {
  // const dropdownRef = useRef(null);
  // const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  // const onClick = () => setIsActive(!isActive);
  let timeout
  const [isActive, setActive] = useState(false)

  const show = () => {
    timeout = setTimeout(() => {
      setActive(true)
    }, delay)
  }

  const hide = () => {
    clearInterval(timeout)
    setActive(false)
  }

  return <div css={dropdownCss} onMouseEnter={show} onMouseLeave={hide}>
    <a href={url}>{label}</a>
    {
      (items.length > 0) && <button css={menuButtonCss}>{downArrow}</button>
    }
    
    {
      (items.length > 0 && isActive) && <div css={menuActiveCss}>
        <ol>{items.map(args => <DropdownItem key={args.label} {...args} />)}</ol>
      </div>
    }

  </div>
}

const DropdownItem = ({ label, url }) => <li><a css={dropdownItemCss} href={url}>{label}</a></li>