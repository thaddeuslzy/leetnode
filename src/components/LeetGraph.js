import { React, useRef, useCallback, useState, useMemo } from 'react';
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
  // const problemId = useSelector(getProblemId);
  // const problemTopics = useSelector(getProblemTopics);

  const graphRef = useRef();

  // TODO: Freeze graph rendering on drag end
  // const onNodeDragEnd = useCallback(node => {
  // }, [graphRef]);

  const handleNodeClick = useCallback(node => {
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
  }, []);

  const { height, width } = useWindowDimensions(); // for responsive resizing of the canvas

  const nodeStyle = (node, ctx, globalScale) => {
    const label = node.id;
    const fontSize = 12/globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    const textWidth = ctx.measureText(label).width;
    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);
    ctx.fillStyle = getNodeColor(node.group);
    ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = getTextColor(node.group);
    ctx.fillText(label, node.x, node.y);
    node.__bckgDimensions = bckgDimensions;
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

  const nodesById = useMemo(() => {
    const nodesById = Object.fromEntries(graphData.nodes.map(node => [node.id, node]));

    graphData.nodes.forEach(node => {
      node.collapsed = node.group === 1;
      node.childLinks = [];
    });

    graphData.links.forEach(link => {
      nodesById[link.source].childLinks.push(link);
    });
    return nodesById;
  }, []);

  const getPrunedTree = useCallback(() => {
    const visibleNodes = [];
    const visibleLinks = [];
    (function traverseTree(node = nodesById['Topics']) {
      visibleNodes.push(node);
      if (node.collapsed) return;
      visibleLinks.push(...node.childLinks);
      node.childLinks
        .map(link => ((typeof link.target) === 'object') ? link.target : nodesById[link.target]) // get child node
        .forEach(traverseTree);
    })();

    return { nodes: visibleNodes, links: visibleLinks };
  }, [nodesById]);

  const handleNodeRightClick = node => {
    node.collapsed = !node.collapsed; // toggle collapse state
    setPrunedTree(getPrunedTree())
  };

  const [prunedTree, setPrunedTree] = useState(getPrunedTree());

  const graph = <ForceGraph2D
    ref={graphRef}
    width={width}
    height={height}
    graphData={prunedTree}
    nodeAutoColorBy={n => n.group}
    nodeCanvasObject={nodeStyle}
    nodePointerAreaPaint={(node, color, ctx) => {
      ctx.fillStyle = color;
      const bckgDimensions = node.__bckgDimensions;
      bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
    }}
    linkAutoColorBy={l => l.source}
    linkWidth={1.5}
    // linkDirectionalArrowLength={5} // seems messier
    // onNodeDragEnd={onNodeDragEnd} // TODO: Implement
    onNodeClick={handleNodeClick}
    onNodeRightClick={handleNodeRightClick}
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
          height: 95%;
        }
        .node-label {
          font-size: 12px;
          padding: 1px 4px;
          border-radius: 4px;
          background-color: black;
          user-select: none;
        }
      `}
      </style>
    </> 
  )
}

export default LeetGraph;