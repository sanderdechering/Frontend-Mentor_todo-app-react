import './App.css'
import iconMoon from './assets/icon-moon.svg'
import iconSun from './assets/icon-sun.svg'
import iconChecked from './assets/icon-check.svg'
import backgroundImage_desktop_dark from './assets/bg-desktop-dark.jpg'
import backgroundImage_desktop_light from './assets/bg-desktop-light.jpg'

import React, {useState} from "react";

function App() {
    const [items, setItems] = useState([
        {
            text: 'My first item',
            completed: false,
        },
        {
            text: 'My second item',
            completed: false,
        },
        {
            text: 'Complete the Todo list',
            completed: false,
        }
    ]);

    const [displayItems, setDisplayItems] = useState(items) // this state is used to display items on screen. We use a display state, so the user can filter trough displayItems and add or remove certain items, without losing the real items.
    const [darkMode, setDarkMode] = useState(true)
    const [filterButtons, setFilterButtons] = useState({
        all: true,
        active: false,
        completed: false,
    });

    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const [dropIndex, setDropIndex] = useState<number | null>(null);

    const handleDragStart = (index: number) => { // function that saves the index of the element its dragged from
        setDragIndex(index);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>, index: number) => { // function that saves the index of the element its dragged to
        event.preventDefault();
        setDropIndex(index);
    };

    const handleDrop = () => { // function that handles the drop
        if (dragIndex !== null && dropIndex !== null && dragIndex !== dropIndex) { // validation. Checking if indexes are values that are not null or the same value
            const newItems = [...items]; // getting al the items

            // changing the indexes of the reordered item list
            const [removedItem] = newItems.splice(dragIndex, 1);
            newItems.splice(dropIndex, 0, removedItem);
            setItems(newItems);
            setDisplayItems(newItems)
        }
        setDragIndex(null);
        setDropIndex(null);
    };

    function addTodo(text: string) {
        const currentItem = [...items]; // get the specified item
        currentItem.push({text: text, completed: false})
        setItems(currentItem); // update the state with the new array
        setDisplayItems(currentItem)
    }

    function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) { // function definition that takes in a keyboard event as argument
        if (event.key === "Enter") { // check if the key pressed was the Enter key
            const inputElement = event.target as HTMLInputElement; // get the input element that triggered the event and cast it as an HTMLInputElement
            const text = inputElement.value.trim(); // get the value of the input element and remove any whitespace from the beginning or end
            if (text) { // check if the input value is not an empty string
                addTodo(text); // call the addTodo function with the input value as argument
                inputElement.value = ""; // clear the input element's value
            }
        }
    }

    function displayActiveItems(){
        const currentItem = items.filter(item => !item.completed);
        setDisplayItems(currentItem); // update the state with the new array
        setFilterButtons({
            all: false,
            active: true,
            completed: false
        });
    }

    function displayCompletedItems(){
        const currentItem = items.filter(item => item.completed);
        setDisplayItems(currentItem); // update the state with the new array
        setFilterButtons({
            all: false,
            active: false,
            completed: true
        });
    }

    function displayAllItems(){
        setDisplayItems(items) // update state with items array, so all items are displayed
        setFilterButtons({
            all: true,
            active: false,
            completed: false
        });
    }

    function clearCompleted() {
        if (!items.some(item => item.completed)){ // check if there are any items set to completed
            alert('Nothing to clear')
            return
        }

        const filteredItems = items.filter(item => !item.completed); // get all non completed items
        setItems(filteredItems); // update the state with only non completed items
        setDisplayItems(filteredItems) // update the items that are being displayed
        if (filterButtons.completed) { // if completed button is true and now that the display items contain no completed items, set the filterbutton 'all' to true
            setFilterButtons({
                all: true,
                active: false,
                completed: false
            })
        }
    }

    function toggleCompleted(index:number) {
        const updatedItems = [...items]; // make a copy of the items array
        const currentItem = updatedItems[index]; // get the specified item
        currentItem.completed = !currentItem.completed; // toggle the completed property of the item
        setItems(updatedItems); // update the state with the new array
    }

    function toggleDarkMode() {
        setDarkMode(!darkMode)
    }

    return (
    <div className={`App ${darkMode ? 'dark' : ''}`} >
        <div className="min-h-screen bg-LightMyVeryLightGray dark:bg-DarkMyVeryDarkBlue text-LightMyVeryDarkGrayishBlue dark:text-DarkMyLightGrayishBlue">
            <img className="w-full absolute dark:block hidden " src={backgroundImage_desktop_dark} alt="background image for desktop dark mode" />
            <img className="w-full absolute block dark:hidden" src={backgroundImage_desktop_light} alt="background image for desktop light mode" />
            <div className="w-full min-h-screen absolute flex justify-center">
                <div className="md:w-2/3 lg:w-2/5 mt-20 flex flex-col">
                    <div className="flex justify-between">
                        <span className="text-4xl font-bold text-white">T O D O</span>
                        <img className="w-7 h-7 cursor-pointer hidden dark:block" src={iconSun} alt="sun icon for light mode" onClick={toggleDarkMode}/>
                        <img className="w-7 h-7 cursor-pointer block dark:hidden" src={iconMoon} alt="moon icon for dark mode" onClick={toggleDarkMode}/>
                    </div>

                    <div className="flex bg-LightMyVeryLightGray dark:bg-DarkMyVeryDarkDesaturatedBlue mt-8 py-5 rounded-md shadow-lg">
                        <div className="flex justify-center ml-6 bg-LightMyLightGrayishBlue dark:bg-DarkMyDarkGrayishBlue rounded-full w-6 h-6 absolute">
                            <div className="bg-LightMyVeryLightGray dark:bg-DarkMyVeryDarkDesaturatedBlue rounded-full w-5 h-5 mt-[2px] absolute"/>
                        </div>
                        <input type="text" className="bg-transparent w-full outline-0 text-xl ml-20" placeholder="Create a new todo..." onKeyDown={handleKeyPress}/>
                    </div>

                    { displayItems.length !== 0 ? (
                    <div className="flex flex-col bg-LightMyVeryLightGray dark:bg-DarkMyVeryDarkDesaturatedBlue mt-8 rounded-t-md shadow-lg" id="todo-list">
                        {displayItems.map((item, index) =>(
                            <div key={index}
                                 draggable={true}
                                 className={`py-4 border-b-[1px] border-LightMyLightGrayishBlue dark:border-DarkMyVeryDarkGrayishBlue flex flex-row 
                                 ${item.completed ? 'line-through text-DarkMyVeryDarkGrayishBlue2' : ''} 
                                 ${dropIndex === index ? 'dark:bg-DarkMyDarkGrayishBlue/50 bg-LightMyDarkGrayishBlue/50': ''}` }
                                 onDragStart={() => handleDragStart(index)}
                                 onDragOver={(event) => handleDragOver(event, index)}
                                 onDrop={handleDrop}
                                 style={{
                                     backgroundColor: dropIndex === index ? 'dark:bg-' : '',
                                 }}>
                                <div className={`flex justify-center ml-6 rounded-full w-6 h-6 absolute ${item.completed ? 'cursor-pointer bg-gradient-to-r from-GradientBlue to-GradientPurple' : 'cursor-pointer bg-LightMyLightGrayishBlue dark:bg-DarkMyDarkGrayishBlue hover:bg-gradient-to-r from-GradientBlue to-GradientPurple'}` } onClick={() => toggleCompleted(index)}>
                                    <div className={`bg-LightMyVeryLightGray dark:bg-DarkMyVeryDarkDesaturatedBlue rounded-full w-5 h-5 mt-[2px] absolute ${item.completed ? 'hidden' : ''}` }/>
                                    <img src={iconChecked} className={`rounded-full w-3.5 h-3.5 my-auto  ${item.completed ? '' : 'hidden'}` } alt="icon of a checkmark"/>
                                </div>

                                <span className="text-xl ml-20">{item.text}</span>
                            </div>
                        ))}
                    </div>

                    ): (
                        <div className="flex flex-col bg-LightMyVeryLightGray dark:bg-DarkMyVeryDarkDesaturatedBlue shadow-lg border-b-[1px] border-LightMyLightGrayishBlue dark:border-DarkMyVeryDarkGrayishBlue  mt-8 rounded-t-md">
                             <p className="p-10 text-xl">No items here...</p>
                        </div>
                    )}
                    <div className="flex flex-row text-LightMyDarkGrayishBlue shadow-lg text-sm bg-LightMyVeryLightGray dark:bg-DarkMyVeryDarkDesaturatedBlue justify-around text-DarkMyVeryDarkGrayishBlue py-4 rounded-b-md">
                        <span className="ml-5">{items.length} items left</span>
                        <div className="mx-20">
                            <span className={`cursor-pointer ${filterButtons['all'] ? 'text-MyBrightBlue' : 'hover:text-DarkMyLightGrayishBlue'}`} onClick={displayAllItems}>All</span>
                            <span className={`cursor-pointer mx-5 ${filterButtons['active'] ? 'text-MyBrightBlue' : 'hover:text-DarkMyLightGrayishBlue'}`} onClick={displayActiveItems}>Active</span>
                            <span className={`cursor-pointer ${filterButtons['completed'] ? 'text-MyBrightBlue' : 'hover:text-DarkMyLightGrayishBlue'}`} onClick={displayCompletedItems}>Completed</span>
                        </div>
                        <span className="hover:text-DarkMyLightGrayishBlue cursor-pointer mr-5" onClick={clearCompleted}>Clear Completed</span>
                    </div>
                </div>
            </div>
        </div>
    </div>


    )
}
export default App
