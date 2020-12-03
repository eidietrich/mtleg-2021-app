import React from 'react';

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

const Header = ({ user, onLogin, onLogout, onCreateAccount }) => (
  <header css={headerStyle}>
    <div css={wrapperStyle}>
      <a href={headerLogoLink}><img css={headerLogoStyle} src={headerLogoSourceUrl}></img></a>
    </div>
  </header>
);

export default Header