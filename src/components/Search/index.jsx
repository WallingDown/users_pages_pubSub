import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import axios from 'axios'

export default class Search extends Component {
    state = {
        keyWord:''  //准备要输入的内容
    }

    /**
     * 保存用户输入的内容
     */
    saveKeyWord = (event) =>{
        const {target:{value:keyWord}} = event
        this.setState({keyWord})
    }

    /**
     * 点击按钮 获取数据
     */
    handleSearch = () =>{
        // 1、获取用户输入
        const {keyWord} = this.state
        // const {updateAppState} = this.props
        // 2、请求之前显示的页面
        // updateAppState({isFirst:false,isLoading:true})
        PubSub.publish('UPDATE_LIST_STATE',{isLoading:true,isFirst:false})
        // 3、发送请求
        axios.get(`/api/search/users?q=${keyWord}`).then(
            response=>{
                // 请求成功，存储用户列表，不展示loading
                // updateAppState({users:response.data.items,isLoading:false})
                PubSub.publish('UPDATE_LIST_STATE',{users:response.data.items,isLoading:false})
            },err=>{
                // 请求失败。存储用户信息，不展示loading
                // updateAppState({error:err.message,isLoading:false})
                PubSub.publish('UPDATE_LIST_STATE',{error:err.message,isLoading:false})
            }
        )
    }

    render() {
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">Search Github Users</h3>
                <div>
                    <input onChange={this.saveKeyWord} type="text" placeholder="enter the name you search" />&nbsp;
                    <button onClick={this.handleSearch}>Search</button>
                </div>
            </section>
        )
    }
}
