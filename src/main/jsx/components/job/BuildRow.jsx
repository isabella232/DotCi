
/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2014, Groupon, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import React from 'react';
import Avatar from '../lib/Avatar.jsx';
import Router from 'react-router';
import BuildIcon from './BuildIcon.jsx';
import BuildCauseIcon from './BuildCauseIcon.jsx';
require('./build_row.css');
export default React.createClass({
  render(){
    let {result,number, cancelUrl,commit,duration,displayTime,cause} = this.props.build.toObject();
    let {message,commitUrl,shortSha,committerName,branch, avatarUrl} = commit.toObject();
    return (
      <div className ={"build-row build-row-"+result}>
        {this._status(result, cause)}
        {this._commitInfo(number,commit,cause)}
        <span>  
          <Router.Link  className="build-row--number" to={'job-widgets'} params={{widget: number}}>#{number}{result.toLowerCase()}</Router.Link>
          {this.props.compact?<span/>: <div><i className="fa fa-github"></i><a className="github-link link-no-decoration" href={commitUrl}> {shortSha}</a></div>}
        </span>
        <span>
          <div>
            <i className="fa fa-clock-o"></i>
            <span className="detail">{duration}</span>
          </div>
          <div>
            <i className="fa fa-calendar"></i>
            <span className="detail">{displayTime}</span>
          </div>
        </span>
      </div>
    );
  },
  _status(result,cause){
    return this.props.compact? <span/>:<span>
      <BuildIcon result={result} />
      <BuildCauseIcon cause={cause.get('name')} />
    </span>
  },
  _commitInfo(number,commit,cause){
    let {message,commitUrl,shortSha,committerName,branch, avatarUrl} = commit.toObject();
    return this.props.compact?<div className="build-row--cause">{cause.get('shortDescription')}</div>
      : <span> <div className="build-row--title"><small>{branch}</small> 
          <Router.Link  to={'job-widgets'} params={{widget: number}}>{message}</Router.Link>
        </div> 
        <div className="build-row--committer">
          <Avatar avatarUrl={avatarUrl} />
          <span>{committerName}</span>
        </div>
        <div className="build-row--cause">{cause.get('shortDescription')}</div>
      </span>
  }
});
