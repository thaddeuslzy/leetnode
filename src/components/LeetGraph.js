import { React, useRef, useCallback } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import useWindowDimensions from '../utils/helpers';
import graphData from '../utils/leetcode_qns_graph.json';
import { useSelector, useDispatch } from 'react-redux';
import {
  getProblemId,
  getProblemTopics,
  setProblemId,
  setProblemTitle,
  setProblemTopics,
  setProblemDifficulty,
  setProblemUpvotes,
  setProblemDownvotes,
  setProblemUrl,
} from '../slices/sidebar';

const LeetGraph = (props) => {
  const dispatch = useDispatch();
  // TODO: Highlight selected node and topic
  const problemId = useSelector(getProblemId);
  const problemTopics = useSelector(getProblemTopics);

  const graphRef = useRef();

  // TODO: Freeze graph rendering on drag end
  const onNodeDragEnd = useCallback(node => {
  }, [graphRef]);

  const onNodeClick = useCallback(node => {
    graphRef.current.centerAt(node.x, node.y, 1000);
    graphRef.current.zoom(3, 1000);
    if (node.group===2) {
      dispatch(setProblemId(node.id));
      dispatch(setProblemTitle(node.name));
      dispatch(setProblemTopics(node.topics));
      dispatch(setProblemDifficulty(node.difficulty));
      dispatch(setProblemUpvotes(node.upvotes));
      dispatch(setProblemDownvotes(node.downvotes));
      dispatch(setProblemUrl(node.url));
    }
  }, [graphRef]);

  const { height, width } = useWindowDimensions();

  const nodeStyle = (node, ctx, globalScale) => {
    const label = node.id;
    const fontSize = 12/globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    const textWidth = ctx.measureText(label).width;
    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding
    ctx.fillStyle = getNodeColor(node.group);
    ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = getTextColor(node.group);
    ctx.fillText(label, node.x, node.y);
    node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
  }

  const getNodeColor = n => {
    if (n===0) {
      return 'gray'
    } else if (n===1) {
      return '#FEA117'
    } else {
      return 'transparent'
    }
  }

  const getTextColor = n => {
    if (n===0) {
      return '#ffffff';
    } else if (n===1){
      return '#ffffff';
    } else {
      return '#555555';
    }
  }

  const graph = <ForceGraph2D
  ref={graphRef}
    width={width-16}
    height={height-16}
    graphData={graphData}
    nodeAutoColorBy={n => n.group}
    nodeCanvasObject={nodeStyle}
    nodePointerAreaPaint={(node, color, ctx) => {
      ctx.fillStyle = color;
      const bckgDimensions = node.__bckgDimensions;
      bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
    }}
    // linkDirectionalArrowLength={5} // seems messier
    // onNodeDragEnd={onNodeDragEnd} // TODO: Implement
    onNodeClick={onNodeClick}
  />

  return (
    <>
      <div className='main-container'>
        <div className='graph-container'>
          {graph}
        </div>
      </div>
      <style jsx>{`
        .main-container {
          display: flex;
        }
        .force-graph-container {
          width: 100%;
          height: 100%;
        }
      `}
      </style>
    </> 
  )
}

export default LeetGraph;