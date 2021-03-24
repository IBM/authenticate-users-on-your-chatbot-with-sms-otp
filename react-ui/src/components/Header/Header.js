import React from 'react';
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
} from 'carbon-components-react';
import { Link } from 'react-router-dom';

const HeaderC = () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <Header>
        <SkipToContent />
        <HeaderMenuButton
          aria-label="Open menu"
          onClick={onClickSideNavExpand}
          isActive={isSideNavExpanded}
        />
        <HeaderName href="/" prefix="Code Pattern">
          Authenticate your Chatbot
        </HeaderName>
        <SideNav
          aria-label="Side navigation"
          expanded={isSideNavExpanded}
          isPersistent={false}>
          <SideNavItems>
          </SideNavItems>
        </SideNav>

        
            <HeaderNavigation style={{padding:"0"}}>
              <HeaderMenuItem href="#section2">Purchase Policy</HeaderMenuItem>
            </HeaderNavigation>
            <HeaderNavigation style={{padding:"0"}}>
              <HeaderMenuItem href="#section3">Display Users</HeaderMenuItem>
            </HeaderNavigation>
        
      </Header>
    )}
  />
);

export default HeaderC;