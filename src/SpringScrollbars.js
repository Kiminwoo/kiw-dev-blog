import React, { Component , useRef} from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { SpringSystem, MathUtil } from 'rebound';

export default class SpringScrollbars extends Component {

    constructor(props, ...rest) {
        super(props, ...rest);
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
        return this.refs.scrollbars.getScrollTop();
    }

    getScrollHeight() {
        return this.refs.scrollbars.getScrollHeight();
    }

    getHeight() {
        return this.refs.scrollbars.getHeight();
    }

    scrollTop(top) {
        const { scrollbars } = this.refs;
        const scrollTop = scrollbars.getScrollTop();
        const scrollHeight = scrollbars.getScrollHeight();
        const val = MathUtil.mapValueInRange(top, 0, scrollHeight, scrollHeight * 0.2, scrollHeight * 0.8);
        this.spring.setCurrentValue(scrollTop).setAtRest();
        this.spring.setEndValue(val);
    }

    handleSpringUpdate(spring) {
        const { scrollbars } = this.refs;
        const val = spring.getCurrentValue();
        scrollbars.scrollTop(val);
    }

    
    renderView({ style, ...props }) {
        const viewStyle = {
            padding: 15
        };
        return (
            <div
                className="box"
                style={{ ...style, ...viewStyle }}
                {...props}/>
        );
    }

    renderThumb({ style, ...props }) {
        const thumbStyle = {
            backgroundColor: `rgb(0,0,0)`,
            borderRadius: '5px'
        };
        return (
            <div
                style={{ ...style, ...thumbStyle }}
                {...props}/>
        );
    }

    render() {
        return (
            <Scrollbars
                renderView={this.renderView}
                renderThumbVertical={this.renderThumb}
                universal={true}
                {...this.props}
            />
        );
    }
}