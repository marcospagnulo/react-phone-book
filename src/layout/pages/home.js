import React from 'react';
import Swiper from 'react-id-swiper';
import Calendar from '../containers/calendar';


export default class Home extends React.Component {

    constructor(props) {
        super(props)
        this.goNext = this.goNext.bind(this)
        this.goPrev = this.goPrev.bind(this)
        this.swiper = null
    }

    goNext() {
        if (this.swiper) this.swiper.slideNext()
    }

    goPrev() {
        if (this.swiper) this.swiper.slidePrev()
    }
    render() {
        return (
            <div className="row">
                <div className="w-100 p-3">
                    <Calendar />
                </div>
            </div>
        )
    }
}