const generateSquares = (reverse) => {

    const boardRows = [
      { label: 1, top: reverse ? 7 * 12 : 0 * 12 },
      { label: 2, top: reverse ? 6 * 12 : 1 * 12 },
      { label: 3, top: reverse ? 5 * 12 : 2 * 12 },
      { label: 4, top: reverse ? 4 * 12 : 3 * 12 },
      { label: 5, top: reverse ? 3 * 12 : 4 * 12 },
      { label: 6, top: reverse ? 2 * 12 : 5 * 12 },
      { label: 7, top: reverse ? 1 * 12 : 6 * 12 },
      { label: 8, top: reverse ? 0 * 12 : 7 * 12 },
    ];
    
    const boardColumns = [
      { label: 1, left: reverse ? 7 * 12 : 0 * 12 },
      { label: 2, left: reverse ? 6 * 12 : 1 * 12 },
      { label: 3, left: reverse ? 5 * 12 : 2 * 12 },
      { label: 4, left: reverse ? 4 * 12 : 3 * 12 },
      { label: 5, left: reverse ? 3 * 12 : 4 * 12 },
      { label: 6, left: reverse ? 2 * 12 : 5 * 12 },
      { label: 7, left: reverse ? 1 * 12 : 6 * 12 },
      { label: 8, left: reverse ? 0 * 12 : 7 * 12 },
    ];

      const squares = [];

      boardRows.forEach((row) => {
          boardColumns.forEach((col) => {
            squares.push({
                row : row.label,
                column : col.label,
                topSize: row.top,
                leftSize: col.left,
                top : row.top+"vh",
                left : col.left+"vh"
            });
          })
      })
      return squares
}
export default generateSquares