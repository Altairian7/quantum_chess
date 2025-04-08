"use client";
import React, { useState } from 'react';

const PuzzlePage = () => {
    const [puzzle, setPuzzle] = useState([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, null],
    ]);

    const handleTileClick = (row: number, col: number) => {
        const newPuzzle = [...puzzle];
        const emptyTile = findEmptyTile();

        if (isAdjacent(row, col, emptyTile.row, emptyTile.col)) {
            newPuzzle[emptyTile.row][emptyTile.col] = newPuzzle[row][col];
            newPuzzle[row][col] = null;
            setPuzzle(newPuzzle);
        }
    };

    const findEmptyTile = () => {
        for (let i = 0; i < puzzle.length; i++) {
            for (let j = 0; j < puzzle[i].length; j++) {
                if (puzzle[i][j] === null) {
                    return { row: i, col: j };
                }
            }
        }
        return { row: -1, col: -1 };
    };

    const isAdjacent = (row1: number, col1: number, row2: number, col2: number) => {
        return (
            (row1 === row2 && Math.abs(col1 - col2) === 1) ||
            (col1 === col2 && Math.abs(row1 - row2) === 1)
        );
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <h1>Sliding Puzzle Game</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '5px' }}>
                {puzzle.map((row, rowIndex) =>
                    row.map((tile, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            onClick={() => handleTileClick(rowIndex, colIndex)}
                            style={{
                                width: '100px',
                                height: '100px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: tile ? '#ddd' : '#fff',
                                border: '1px solid #000',
                                cursor: tile ? 'pointer' : 'default',
                            }}
                        >
                            {tile}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PuzzlePage;