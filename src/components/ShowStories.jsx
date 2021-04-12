import React, { useEffect, useState } from 'react';
import Api from '../Utils/Api';
import Story from './Story';

const { getTopStories } = Api;

const TopStories = () => {
    const [ stories, setStories ] = useState([]);
    const [ isDataLoading, setIsDataLoading ] = useState(true);

    useEffect(() => {
       const getStoriesData = async () => {
        const { data } = await getTopStories(10);

        setStories(data || []);
        setIsDataLoading(false);
       };
       getStoriesData();
    }, []);

    return (<div>
        {isDataLoading && <p>Top Stories Loading</p>}
        {!isDataLoading && stories.length && <div>
            {
                stories.map(storyId => <Story storyId={storyId} key={storyId} />)
            }
        </div>}
    </div>);
};

export default TopStories;
