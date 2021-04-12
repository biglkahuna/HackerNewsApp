import axios from 'axios';

const baseUrl = 'https://hacker-news.firebaseio.com/v0';

const getTopStories = async (noOfStories) => {
    try {
        const { data } = await axios.get(`${baseUrl}/topstories.json?print=pretty&orderBy="$key"&limitToFirst=${noOfStories || 10}`);

        return { data };
    }
    catch (error) {
        console.error('Error while loading the stories');
    }
};

const getStoryById = async (storyId) => {
    try {
        const { data } = await axios.get(`${baseUrl}/item/${storyId}.json?print=pretty`);

        return { data };
    }
    catch (error) {
        console.error('Error while loading the story', storyId);
    }
};

const getComments = async (commentIds, noOfComments) => {
    try {
        const topComments = commentIds.slice(0, noOfComments);
        
        const getCommentsPromiseArray = topComments.map((commentId) => {
            return axios.get(`${baseUrl}/item/${commentId}.json?print=pretty`);
        });
        
        const promiseData = await Promise.all(getCommentsPromiseArray);

        console.log(promiseData);

        return { data: promiseData.map(d => d.data) };
    }
    catch (error) {
        console.error('Error while loading the top comments to the story');
    }
};

const modules = {
    getTopStories,
    getStoryById,
    getComments
};

export default modules;