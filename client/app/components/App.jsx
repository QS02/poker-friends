// @flow
import * as React from 'react'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { css } from 'emotion'

import { tokenLogin } from '../actions/user'

import io from 'socket.io-client'
const socket = io('/')

const container = css`
  height: 100vh;
  background: #fafafa;
`

type Props = {
  token: string,
  tokenLogin: (token: string) => void,
  children?: React.Element<any>,
}
class App extends React.Component<Props> {
  componentDidMount() {
    const { token, tokenLogin } = this.props

    if (token) {
      tokenLogin(token)
    } else {
      if (hashHistory.getCurrentLocation().pathname !== '/login') {
        hashHistory.push('/login')
      }
    }
  }

  render() {
    const { children } = this.props;
    if (!children) return null;

    return <div className={container}>{React.cloneElement(children, { socket })}</div>;
  }
}

function mapStateToProps(state) {
  return { token: state.user.token }
}

const mapDispatchToProps = ({ tokenLogin })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
