import React from 'react'
import {connect} from 'dva'
import {TickersFm,TickerFm} from 'modules/tickers/formatters'
import routeActions from 'common/utils/routeActions'
import { Button,Spin } from 'antd'

function ListTokenTickers(props) {
  const {loopringTickers:list,dispatch} = props
  const tickersFm = new TickersFm(list)
  const listedTickers = tickersFm.getTickersBySymbol('LRC') // TODO
  const gotoTrade = (item)=>{
    routeActions.gotoPath('/trade')
    dispatch({
      type:'sockets/filtersChange',
      payload:{
        id:'tickers',
        filters:{market:item.market}
      }
    })
    dispatch({
      type:'sockets/filtersChange',
      payload:{
        id:'depth',
        filters:{market:item.market}
      }
    })
    dispatch({
      type:'sockets/filtersChange',
      payload:{
        id:'trades',
        filters:{market:item.market}
      }
    })
    dispatch({
      type:'sockets/extraChange',
      payload:{
        id:'loopringTickers',
        extra:{current:item.market}
      }
    })
    dispatch({
      type:'orders/filtersChange',
      payload:{
        id:'MyOpenOrders',
        filters:{market:item.market}
      }
    })
    dispatch({
      type:'fills/filtersChange',
      payload:{
        id:'MyFills',
        filters:{market:item.market}
      }
    })
  }
  return (
    <div>
        <div className="loopring-dex">
            <div className="card-header bordered">
                <h4>Loopring DEX Markets</h4>
            </div>
            <Spin spinning={list.loading}>
              <div className="body" style={{minHeight:'50px'}}>
                  {
                    listedTickers.map((item,index)=>{
                      const tickerFm = new TickerFm(item)
                      return (
                        <div className="item">
                            <ul>
                                <li><h3>{item.market}</h3></li>
                                <li><small>Price</small><span className="text-down">{tickerFm.getChange()}</span></li>
                                <li><small>Change</small><span className="text-up">{tickerFm.getChange()}</span></li>
                            </ul>
                            <Button className="btn btn-primary" onClick={gotoTrade.bind(this,item)}>Go To Trade</Button>
                        </div>
                      )
                    })
                  }
              </div>
            </Spin>
        </div>
        <div>
            <div className="card-header bordered">
                <h4>Reference Markets</h4>
            </div>
            <div style={{overflow: "auto",maxHeight: "300px"}}>
                <table className="table table-hover table-striped table-dark text-center text-left-col1 text-right-last">
                    <thead>
                        <tr>
                            <th>Markets</th>
                            <th>Price</th>
                            <th>Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>OKEX</td>
                            <td>0.56 USD</td>
                            <td className="text-up">+9.8%</td>
                        </tr>
                        <tr>
                            <td>Binance</td>
                            <td>0.56 USD</td>
                            <td className="text-down">-1.45%</td>
                        </tr>
                        <tr>
                            <td>Coinbase</td>
                            <td>0.56 USD</td>
                            <td className="text-up">+9.8%</td>
                        </tr>
                        <tr>
                            <td>Bittrex</td>
                            <td>0.56 USD</td>
                            <td className="text-up">+9.8%</td>
                        </tr>
                        <tr>
                            <td>Poloniex</td>
                            <td>0.56 USD</td>
                            <td className="text-down">-1.45%</td>
                        </tr>
                        <tr>
                            <td>Bitfinex</td>
                            <td>0.56 USD</td>
                            <td className="text-up">+9.8%</td>
                        </tr>
                        <tr>
                            <td>Bitmex</td>
                            <td>0.56 USD</td>
                            <td className="text-up">+9.8%</td>
                        </tr>
                        <tr>
                            <td>GDAX</td>
                            <td>0.56 USD</td>
                            <td className="text-down">-1.45%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default connect(
  ({sockets:{loopringTickers}})=>({loopringTickers})
)(ListTokenTickers)
