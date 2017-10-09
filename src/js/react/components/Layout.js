import React from 'react'
import { connect } from 'react-redux'

import { fetchUser } from '../../redux/actions/userActions';
import { fetchTweets } from '../../redux/actions/tweetsActions';

@connect((store) => {
    return {
        user: store.user.user,
        userFetched: store.user.fetched,
        tweets: store.tweets.tweets
    };
})

export default class Layout extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchUser());
    }

    fetchTweets() {
        this.props.dispatch(fetchTweets());
    }

    render() {
        console.log(this.props);
        const user = this.props.user;
        const tweets = this.props.tweets;

        if (!tweets.length) {
            return (
                <div className="container">
                    <h1>{user.name}</h1>
                    <button onClick={this.fetchTweets.bind(this)}>Load Tweets</button>
                </div>
            );
        }

        const mappedTweets = tweets.map((tweet, i) => {
            return (
                <li key={i}>{tweet.text}</li>
            );
        });

        return (
            <div className="container">
                <h1>{user.name}</h1>
                <ul>{mappedTweets}</ul>
            </div>
        );
    }
};
