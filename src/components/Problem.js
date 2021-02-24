import { useSelector, useDispatch } from 'react-redux';
import {
  getProblemId,
  getProblemTitle,
  getProblemTopics,
  getProblemDifficulty,
  getProblemUpvotes,
  getProblemDownvotes,
  getProblemUrl,
} from '../slices/sidebar';

const Problem = () => {
  const id = useSelector(getProblemId);
  const title = useSelector(getProblemTitle);
  const topics = useSelector(getProblemTopics);
  const difficulty = useSelector(getProblemDifficulty);
  const upvotes = useSelector(getProblemUpvotes);
  const downvotes = useSelector(getProblemDownvotes);
  const url = useSelector(getProblemUrl);

  // TODO: Set difficulty text and color
  const getDifficulty = (diff) => {
    if (diff === '1') {
    } else if (diff === '2') {
    } else if (diff === '3') {
    }
  }
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
          <p>{difficulty}</p>
          <div>
            <span>{upvotes}</span>
          </div>
          <div>
            <span>{downvotes}</span>
          </div>
          <a href={url} target='_blank'>See Question</a>
        </div>
      </div>
      <p>Problem description feature coming soon!</p>
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
      `}
      </style>
    </div>
  );
}

export default Problem;