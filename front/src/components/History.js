import React, { useEffect, useState } from 'react'
import { Modal } from './Modal'
import useModal from '../hooks/useModal';
import ClearHistory from './ClearHistory';
import { truncate } from '../utils/helper';
/**
 * History is a component that displays the history of summaries in a list,
 * and allows the user to view the details of each summary in a modal.
 *
 * @param {string} summary - The summary to add to the history.
 */

function History({ summary }) {
    const [items, setItems] = useState([])
    const { modal, setModal, data, setData, toggleModal } = useModal()

    useEffect(() => {
        if (localStorage.getItem('items')) {
            // Check if localStorage.items is an array
            const itemsArray =
                localStorage.getItem('items') instanceof Array
                    ? JSON.parse(localStorage.getItem('items'))
                    : [localStorage.getItem('items')]

            // Add the new item to the array and save it to localStorage
            const newItems = JSON.stringify([...itemsArray, summary])
            setItems([...itemsArray, summary])
            localStorage.setItem('items', newItems)
        } else {
            // Set the initial item in localStorage and the component state
            setItems([summary])
            localStorage.setItem('items', summary)
        }
    }, [summary]);

    return (
        <div className='item'>
            <h2 id='top-padding'>History</h2>
            <ClearHistory setItems={setItems} />
            <div className='history'>
                {items.map(function (sum, index) {
                    if (sum !== '')
                        return (
                            <li key={index} data-sum={sum} onClick={(event) => {
                                setData(event.target.getAttribute('data-sum'))
                                setModal(!modal)
                            }}>
                                {truncate(sum)}
                            </li>
                        )
                })}
            </div>
            {modal && (<Modal toggleModal={toggleModal} data={data} />)}
        </div>
    )
}

export default History
