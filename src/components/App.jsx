import React from 'react';
import TimeZone from '../containers/TimeZone';
import NewsItem from '../containers/NewsItem'
import Loading from '../containers/Loading'


let App = () => (
  <div>
    <TimeZone />
    <Loading />
    <NewsItem />
  </div>
);


export default App;
