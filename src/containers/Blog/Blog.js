import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    // set state with empty posts
    state = {
        posts: [],
        selectedPostId: null,
    }

    // cause side effects after rendering component
    componentDidMount () {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                // update state
                const posts = response.data.slice(0,4);
                const updatedPosts = posts.map(post => {
                    return { 
                        ...post, 
                        author: 'Max'};
                })
                this.setState({
                    posts: updatedPosts,
                })
            });
    }

    postSelectedHandler = (id) => {
        this.setState({
            selectedPostId: id, 
        })
    };

    render () {

        const posts = this.state.posts.map(post => {
            return (
                <Post
                    key={post.id} 
                    title={post.title}
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)}/>
            );
        });

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;