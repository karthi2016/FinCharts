/** @jsx React.DOM */

var $ = require("jquery");
var React = require("react/addons");
var moment = require("moment");
var AppContext = require("ui/core/appcontext");
var ChartActions = require("ui/core/actions/chartactions");

var Popups = React.createClass({
    onDurationChanged: function (evt) {
        var $target = $(evt.target);

        if (!$target.hasClass("disabled")) {
            var newDuration = $target.attr("value");
            ChartActions.updateDuration(newDuration);
        }
    },
    onTimeframeChanged: function (evt) {
        var timeframeInMonths = $(evt.target).attr("value");
        var toDate = moment().toDate();
        var fromDate = moment(toDate).subtract(timeframeInMonths, 'months').toDate()

        var chartStore = AppContext.stores.chartStore;
        var chartDuration = chartStore.getDuration();
        chartDuration =  (timeframeInMonths > 84) ? "monthly" : (timeframeInMonths > 18 ? "weekly" : "daily");

        ChartActions.updateTimeframe(fromDate, toDate, chartDuration);
    },
    onChartLayoutChanged: function (evt) {
        var $target = $(evt.target);

        var index = 0, chartLayoutId;
        for (index = 0; index < 3; ++index) {
            if ($target.hasClass("layoutbutton") && $target.attr("data-layout"))
            {
                chartLayoutId = $target.attr("data-layout");
                break;
            }
            $target = $target.parent();
        }

        if (chartLayoutId) {
            ChartActions.updateChartLayout(chartLayoutId);
        }
    },
    getDurationPopupDOM: function (popupStyle) {
        var chartStore = AppContext.stores.chartStore;
        var currentDuration = chartStore.getDuration();
        var timeframeInMonths = chartStore.getTimeframeInMonths();

        var getCssForOptionItem = function (value) {
            var className = "option";

            if (currentDuration === value) {
                className += " selected";
            }

            if ( (timeframeInMonths > 18 && value === "daily") ||
                 (timeframeInMonths > 84 && value === "weekly")){
                className += " disabled";
            }

            return className;
        }

        return  <div className="range-options nav-options popup" style={popupStyle} onClick={this.onDurationChanged}>
                    <div className={getCssForOptionItem('daily')} value="daily">Daily</div>
                    <div className={getCssForOptionItem('weekly')} value="weekly">Weekly</div>
                    <div className={getCssForOptionItem('montly')} value="monthly">Monthly</div>
                </div>;

    },
    getTimeframePopupDOM: function (popupStyle) {
        var chartStore = AppContext.stores.chartStore;
        var timeframeDiffInMonths = chartStore.getTimeframeInMonths();

        var getCssForOptionItem = function (value) {
            var className = "option";

            if (timeframeDiffInMonths === value) {
                className += " selected";
            }

            return className;
        }

        return <div className="timeframe-options nav-options popup" style={popupStyle} onClick={this.onTimeframeChanged}>
                    <div className={getCssForOptionItem(3)} value="3">3M</div>
                    <div className={getCssForOptionItem(6)} value="6">6M</div>
                    <div className={getCssForOptionItem(9)} value="9">9M</div>
                    <div className={getCssForOptionItem(12)} value="12">1Y</div>
                    <div className={getCssForOptionItem(18)} value="18">1.5Y</div>
                    <div className={getCssForOptionItem(24)} value="24">2Y</div>
                    <div className={getCssForOptionItem(30)} value="30">2.5Y</div>
                    <div className={getCssForOptionItem(36)} value="36">3Y</div>
                    <div className={getCssForOptionItem(42)} value="42">3.5Y</div>
                    <div className={getCssForOptionItem(48)} value="48">4Y</div>
                    <div className={getCssForOptionItem(54)} value="54">4.5Y</div>
                    <div className={getCssForOptionItem(60)} value="60">5Y</div>
                    <div className={getCssForOptionItem(72)} value="72">6Y</div>
                    <div className={getCssForOptionItem(84)} value="84">7Y</div>
                    <div className={getCssForOptionItem(96)} value="96">8Y</div>
                    <div className={getCssForOptionItem(120)} value="120">10Y</div>
                    <div className={getCssForOptionItem(180)} value="180">15Y</div>
                    <div className={getCssForOptionItem(240)} value="240">20Y</div>
                    <div className={getCssForOptionItem(300)} value="300">25Y</div>
                    <div className={getCssForOptionItem(360)} value="360">30Y</div>
                </div>;

    },
    getChartLayoutPopupDOM: function (popupStyle) {
        return <div className="layouts-options nav-options popup" style={popupStyle} onClick={this.onChartLayoutChanged}>
                    <div className="option selected" value="chartslayout1a">
                        <div className="layoutbutton" data-layout="chartslayout1a">
                            <span className="box box1"></span>
                        </div>
                    </div>
                    <div className="option" value="chartslayout2a">
                        <div className="layoutbutton" data-layout="chartslayout2a">
                            <span className="box box1"></span>
                            <span className="box box2"></span>
                        </div>
                    </div>
                    <div className="option" value="chartslayout2b">
                        <div className="layoutbutton" data-layout="chartslayout2b">
                            <span className="box box1"></span>
                            <span className="box box2"></span>
                        </div>
                    </div>
                    <div className="option" value="chartslayout3a">
                        <div className="layoutbutton" data-layout="chartslayout3a">
                            <span className="box box1"></span>
                            <span className="box box2"></span>
                            <span className="box box3"></span>
                        </div>
                    </div>
                    <div className="option" value="chartslayout3b">
                        <div className="layoutbutton" data-layout="chartslayout3b">
                            <span className="box box1"></span>
                            <span className="box box2"></span>
                            <span className="box box3"></span>
                        </div>
                    </div>
                    <div className="option" value="chartslayout3c">
                        <div className="layoutbutton" data-layout="chartslayout3c">
                            <span className="box box1"></span>
                            <span className="box box2"></span>
                            <span className="box box3"></span>
                        </div>
                    </div>
                </div>;
    },
    render: function() {
        var appUIStore = AppContext.stores.appUIStore;
        var popupFlags = appUIStore.getPopupFlags();
        var popupRect = appUIStore.getPopupRect();
        var popupStyle = {
            top: popupRect.top,
            left: popupRect.left
        };


        var popupDOM;
        if (popupFlags.durationOptions) {
            popupDOM =  this.getDurationPopupDOM(popupStyle);
        } else if (popupFlags.timeframeOptions) {
            popupDOM =  this.getTimeframePopupDOM(popupStyle);
        } else if (popupFlags.chartLayoutOptions) {
            popupDOM =  this.getChartLayoutPopupDOM(popupStyle);
        }

        return (
            <section id="popups" style={popupStyle}>
                {popupDOM}
            </section>
        );
    }
});

module.exports = Popups;
