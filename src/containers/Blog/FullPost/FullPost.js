import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {

    state = {
        loadedPost: null,
    }

    componentDidUpdate () {
        if (this.props.id) {
            // infinite loop caused by setState => componentDidUpdate => setState 
            // add additional condition to setState
            // only make request if: (1) no post selected; or (2) post selected and id is different
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
                axios.get('/posts/' + this.props.id)
                    .then( response => {
                        this.setState({
                            loadedPost: response.data,
                        })
                    });
            }
        }
    };

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.id)
            .then( response => {
                console.log(response);
            });
    }

    render () {
        // default 
        let post = <p style={{ textAlign: 'center'}}>Please select a Post!</p>;
        // render when id is valid, but async request loading
        if (this.props.id) {
            post = <p style={{ textAlign: 'center'}}>Loading!</p>;
        }
        // render when id has been used to load post
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button 
                            className="Delete"
                            onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
    
            );
        }
        return post;
    }
}

export default FullPost;