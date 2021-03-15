const Difficulty = (props) => {
  var diffString;
  if (props.difficulty === 1) {
    diffString= 'Easy'
  } else if (props.difficulty === 2) {
    diffString = 'Medium'
  } else if (props.difficulty === 3) {
    diffString = 'Hard'
  } else {
    diffString = 'Undefined'
  }
  return <>
    <p id={diffString} >{diffString}</p>
    <style jsx>{`
      #Easy {
        color: rgb(67, 160, 71);
      }
      #Medium {
        color: rgb(239, 108, 0);
      }
      #Hard {
        color: rgb(233, 30, 99);
      }
      `}
      </style>
  </>
  
}

export default Difficulty;