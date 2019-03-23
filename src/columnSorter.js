import React, { Component } from 'react';

export function ColumnSorter(props) {
    function handleClickA(e) {
        e.preventDefault();
        props.onClickA(props.value);
    }
    function handleClickB(e) {
        e.preventDefault();
        props.onClickB(props.value);
    }
    return <div>
        <input value="+" type="button" val={props.value} onClick={handleClickA} />
        <input value="-" type="button" val={props.value} onClick={handleClickB} />
    </div>;
}