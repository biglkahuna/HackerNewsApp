import React, { useEffect, useState } from 'react';
import Api from '../Utils/Api';
import Comments from './Comments';

const { getStoryById } = Api;

const Link = ({ url, title }) => (
    <a href={url} target="_blank" rel="noreferrer">
      {title}
    </a>
  );

const Story = ({storyId}) => {
    const [ storyData, setStoryData ] = useState(null);
    const [loadingStoryData, setLoadingStoryData] = useState(true);
    const [viewComments, setViewComments] = useState(false);

    useEffect(() => {
        const getStoreData = async () => {
            const { data } = await getStoryById(storyId);

            setStoryData(data || null);
            setLoadingStoryData(false);
        };

        getStoreData();

        return () => {
            setViewComments(false);
        };
    }, [storyId]);

    return (<>
        {loadingStoryData && <div className="story">Story Data is loading</div>}
        {!loadingStoryData && storyData && <div className="story">
            <div className="story-title">
                <Link url={storyData.url} title={storyData.title} />
            </div>
            <p dangerouslySetInnerHTML={{ __html: storyData.text }}></p>
            <div className="story-meta-info">
                <span className="comments-btn" onClick={() => setViewComments(!viewComments)}>{!viewComments ? "View Comments" : "Hide Comments"}</span>
                <span>Posted By:<label>{storyData.by || "NA"} | {new Date(storyData.time * 1000).toLocaleDateString('en-US', {hour: 'numeric',minute: 'numeric'})}</label></span>
            </div>
            {viewComments && <Comments commentIds={storyData.kids} />}
        </div>}
    </>);
};

export default Story;
