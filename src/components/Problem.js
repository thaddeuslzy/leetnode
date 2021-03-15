import { useSelector } from 'react-redux';
import Difficulty from './Difficulty';
import {
  getProblemId,
  getProblemTitle,
  getProblemTopics,
  getProblemDifficulty,
  getProblemUpvotes,
  getProblemDownvotes,
  getProblemUrl,
} from '../slices/sidebar';

import UPVOTE from '../static/images/upvote.png';
import DOWNVOTE from '../static/images/downvote.png';

const Problem = () => {
  const id = useSelector(getProblemId);
  const title = useSelector(getProblemTitle);
  const topics = useSelector(getProblemTopics);
  const difficulty = useSelector(getProblemDifficulty);
  const upvotes = useSelector(getProblemUpvotes);
  const downvotes = useSelector(getProblemDownvotes);
  const url = useSelector(getProblemUrl);

  return (
    <div className='problem-container'>
      <div className='problem-header-container'>
        <h3 className='problem-header-title'>{`${id}. ${title}`}</h3>
        <div className='categories-container'>
          {topics.map(topic => 
          <p>{topic}</p>
          )}
        </div>
        <div className='stats-container'>
          <Difficulty
          difficulty={difficulty}
          />
          <div>
            <img className='vote-icon' alt='upvote' src={UPVOTE} />
            <span>{upvotes}</span>
          </div>
          <div>
            <img className='vote-icon' alt='upvote' src={DOWNVOTE} />
            <span>{downvotes}</span>
          </div>
          <a href={url} target='_blank' rel="noreferrer">See Question</a>
        </div>
      </div>
      <p>Problem description feature coming soon!</p>
      <p>Click to focus on node</p>
      <p>Right-Click to expand/collapse node</p>
      <p>Click and drag to pan around the graph</p>
      <style jsx>{`
      .problem-container {
        padding: 1rem;
      }
      .problem-header-container {
        border-bottom: solid thin;
        border-color: lightgrey;
      }
      .problem-header-title {
        display: block;
        text-align: left;
        margin: 0;
      }
      .categories-container {
        display: flex;
        flex-wrap: wrap;
      }
      .categories-container > p {
        margin: 0.25rem;
        font-size: 0.75rem;
        background-color: lightgrey;
        border-radius: 10rem;
        padding: 0.125rem 0.5rem;
      }
      .stats-container {
        display: flex;
        flex: row;
        justify-content: space-between;
      }
      .stats-container > * {
        margin: 0.5rem 0;
      }
      .vote-icon {
        height: 0.875rem;
        padding-right: 0.125rem;
      }
      `}
      </style>
    </div>
  );
}

export default Problem;