import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import './index.css'

export default class List extends Component {
    state = {
        isFirst:true,
        isLoading:false,
        error:'',
        users:[]
    }

    /**
     * 页面加载完成后
     * UPDATE_LIST_STATE ： 消息名
     * _ ：消息名
     */
    componentDidMount (){
        // 订阅消息
        this.token = PubSub.subscribe('UPDATE_LIST_STATE',(_,stateObj) =>{
            this.setState(stateObj)
        });
    }
     
    componentWillUnmount(){
        // 取消订阅
        PubSub.unsubscribe(this.token)
    }

    render() {
        const {
            isFirst,
            isLoading,
            error,
            users
        } = this.state

        return (
            <div className="row">
                {
                    isFirst ? 
                    <h1>输入关键字，点击进行搜索</h1> :
                    isLoading ? 
                    <h1>Loading...</h1> :
                    error ?
                    <h1 style={{color:'red'}}>{error}</h1> :
                    // 正常展示数据
                    users.map((user)=>{
                        return (
                            <div key={user.id} className="card">
                            <a href={user.html_url} target="_blank">
                                <img src={user.avatar_url} style={{width: "100px"}}/>
                            </a>
                        <p className="card-text">{user.login}</p>
                        </div>
                        )
                    })
                }
               
            </div>
        )
    }
}
