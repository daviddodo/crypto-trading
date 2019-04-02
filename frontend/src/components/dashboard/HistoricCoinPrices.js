import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import _ from 'lodash';
import moment from 'moment';
import {
    getHistoricalDaily
} from '../../actions/index';

const mapStateToProps = state => {
    return {
        coins: state.coins.coinHistorical
    }
};

class HistoricCoinPrices extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.generateLabels = this.generateLabels.bind(this);
    }

    componentWillMount() {
        this.props.getHistoricalDaily('BTC', 365);
    }

    generateLabels() {
        let labels = [];

        for(let i = 7; i >= 0; i--) {
            labels.push(moment().subtract(i, 'd').format('L'))
        }

        return labels;
    }

    render() {
        /*
         * I apologize to whoever has to read this (probably my future self) had to
         * speed-run this :( (April 1 2019)
         */
        const summarizeDailiesToMonthly = () => {
            const desiredNumberOfDataPoints = 12;
            let counter = 0;
            const dataPoints = (this.props.coins ? this.props.coins.length: 0);

            const jump = _.ceil(dataPoints / desiredNumberOfDataPoints);

            //Missing the first data point
            const arr =  _.filter(
                _.map(this.props.coins, coin => {
                    if(counter === jump) {
                        counter = 0;
                        return coin.high;
                    }
                    counter++;
                }), coin => _.isNumber(coin));

            //TODO I'm sure there's a better way than this speed-run version
            return [this.props.coins ? this.props.coins[0] : 0, ...arr];
        };

        const summarize = () => {
            const desiredNumberOfDataPoints = 12;
            let counter = 0;
            const dataPoints = (this.props.coins ? this.props.coins.length: 0);

            const jump = _.ceil(dataPoints / desiredNumberOfDataPoints);

            const arr =  _.filter(
                _.map(this.props.coins, coin => {
                    if(counter === jump) {
                        counter = 0;
                        return coin;
                    }
                    counter++;
                }), coin => !_.isUndefined(coin));

            return [this.props.coins ? this.props.coins[0] : 0, ...arr];
        };

        const generateData = () => {
            return _.map(this.props.coins, coin => coin.high)
        };

        const data = {
                labels: _.map(summarize(), coin => moment.unix(coin.time).format('MMM YYYY')),
                datasets: [
                    {
                        label: 'Historic Coin Prices',
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointHitRadius: 10,
                        data: _.map(summarize(), coin => coin.high)
                    }
                ]
        };

        const options = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        min: 0
                    }
                }]
            },
        };

        return (
            <div className="card">
                <div className="header">
                    <h4 className="title">Coins</h4>
                </div>
                {console.log(_.map(summarize(), coin => moment.unix(coin.time).format('MMM YYYY')))}
                <Line data={data} options={options}/>
            </div>
        )
    }
}

const mapDispatchToProps = {
    getHistoricalDaily
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoricCoinPrices);