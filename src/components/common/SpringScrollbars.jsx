import React, { Component, useContext } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { SpringSystem, MathUtil } from 'rebound';

import { gViewMode } from '@pages/_app';

export default class SpringScrollbars extends Component {
  static contextType = gViewMode;

  constructor(props, ...rest) {
    super(props, ...rest);

    // createRef를 사용하여 ref 생성
    this.scrollbarsRef = React.createRef();

    // 메서드를 화살표 함수로 정의하여 바인딩 제거
    this.handleSpringUpdate = this.handleSpringUpdate.bind(this);
    this.renderView = this.renderView.bind(this);
    this.renderThumb = this.renderThumb.bind(this);
  }

  componentDidMount() {
    this.springSystem = new SpringSystem();
    this.spring = this.springSystem.createSpring();
    this.spring.addListener({ onSpringUpdate: this.handleSpringUpdate });
  }

  componentWillUnmount() {
    this.springSystem.deregisterSpring(this.spring);
    this.springSystem.removeAllListeners();
    this.springSystem = undefined;
    this.spring.destroy();
    this.spring = undefined;
  }

  getScrollTop() {
    return this.scrollbarsRef.current.getScrollTop();
  }

  getScrollHeight() {
    return this.scrollbarsRef.current.getScrollHeight();
  }

  getHeight() {
    return this.scrollbarsRef.current.getHeight();
  }

  scrollTop(top) {
    const scrollbars = this.scrollbarsRef.current;
    const scrollTop = scrollbars.getScrollTop();
    const scrollHeight = scrollbars.getScrollHeight();
    const val = MathUtil.mapValueInRange(
      top,
      0,
      scrollHeight,
      scrollHeight * 0.2,
      scrollHeight * 0.8
    );
    this.spring.setCurrentValue(scrollTop).setAtRest();
    this.spring.setEndValue(val);
  }

  handleSpringUpdate(spring) {
    const scrollbars = this.scrollbarsRef.current;
    const val = spring.getCurrentValue();
    scrollbars.scrollTop(val);
  }

  renderView = ({ style, ...props }) => {
    const viewStyle = {
      padding: 15,
    };
    return (
      <div className="box" style={{ ...style, ...viewStyle }} {...props} />
    );
  };

  renderThumb = ({ style, ...props }) => {
    const viewMode = this.context;
    const thumbStyle = {
      backgroundColor: viewMode ? 'rgb(255,255,255)' : 'rgb(0,0,0)',
      borderRadius: '5px',
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };

  render() {
    return (
      <Scrollbars
        ref={this.scrollbarsRef}
        renderView={this.renderView}
        renderThumbVertical={this.renderThumb}
        renderThumbHorizontal={this.renderThumb}
        universal={true}
        {...this.props}
      />
    );
  }
}
