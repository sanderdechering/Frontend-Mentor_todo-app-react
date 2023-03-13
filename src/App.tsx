import './App.css'
import iconMoon from './assets/icon-moon.svg'
import iconSun from './assets/icon-sun.svg'
import iconChecked from './assets/icon-check.svg'
import backgroundImage_desktop_dark from './assets/bg-desktop-dark.jpg'
import {useState} from "react";
function App() {
    const [items, setItems] = useState([
        {
            text: 'test item',
            completed: false,
        }
    ]);

    let [displayItems, setDisplayItems] = useState(items)

    function addTodo(text: string) {
        const currentItem = [...items]; // get the specified item
        currentItem.push({text: text, completed: false})
        setItems(currentItem); // update the state with the new array
        setDisplayItems(currentItem)
    }

    function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            const inputElement = event.target as HTMLInputElement;
            const text = inputElement.value.trim();
            if (text) {
                addTodo(text);
                inputElement.value = "";
            }
        }
    }

    function displayActiveItems(){
        const currentItem = items.filter(item => !item.completed);
        setDisplayItems(currentItem); // update the state with the new array
    }
    function displayCompletedItems(){
        const currentItem = items.filter(item => item.completed);
        setDisplayItems(currentItem); // update the state with the new array
    }
    function displayAllItems(){
        setDisplayItems(items) // update state with items array, so all items are displayed
    }

    function clearCompleted() {
        const filteredItems = items.filter(item => !item.completed);
        setItems(filteredItems);
        setDisplayItems(filteredItems)
        console.log('hello')
    }

    function toggleCompleted(index:number) {
        const updatedItems = [...items]; // make a copy of the items array
        const currentItem = updatedItems[index]; // get the specified item
        currentItem.completed = !currentItem.completed; // toggle the completed property of the item
        setItems(updatedItems); // update the state with the new array
    }

    return (
    <div className="App">
        <div className="min-h-screen bg-DarkMyVeryDarkBlue text-DarkMyLightGrayishBlue">
            <img className="w-full absolute " src={backgroundImage_desktop_dark} alt="background image for desktop dark mode" />
            <div className="w-full min-h-screen absolute flex justify-center">
                <div className="md:w-2/3 lg:w-2/5 mt-20 flex flex-col">
                    <div className="flex justify-between">
                        <span className="text-4xl font-bold text-white">T O D O</span>
                        <img className="w-7 h-7 cursor-pointer" src={iconSun} alt="sun icon for light mode" />
                    </div>

                    <div className="flex bg-DarkMyVeryDarkDesaturatedBlue mt-8 py-5 rounded-md">
                        <div className="flex justify-center ml-6 bg-DarkMyDarkGrayishBlue rounded-full w-6 h-6 absolute">
                            <div className="bg-DarkMyVeryDarkDesaturatedBlue rounded-full w-5 h-5 mt-[2px] absolute"/>
                        </div>
                        <input type="text" className="bg-transparent w-full outline-0 text-xl ml-20" placeholder="Create a new todo..." onKeyDown={handleKeyPress}/>
                    </div>

                    { displayItems.length !== 0 ? (
                    <div className="flex flex-col bg-DarkMyVeryDarkDesaturatedBlue mt-8 rounded-t-md">
                        {displayItems.map((item, index) =>(
                            <div key={index} className={`py-4 border-b-[1px] border-DarkMyVeryDarkGrayishBlue flex flex-row ${item.completed ? 'line-through text-DarkMyVeryDarkGrayishBlue2' : ''}` }>
                                <div className={`flex justify-center ml-6  rounded-full w-6 h-6 absolute ${item.completed ? 'cursor-pointer bg-DarkMyDarkGrayishBlue bg-gradient-to-r from-GradientBlue to-GradientPurple' : 'cursor-pointer bg-DarkMyDarkGrayishBlue hover:bg-gradient-to-r from-GradientBlue to-GradientPurple'}\`` } onClick={() => toggleCompleted(index)}>
                                    <div className={`bg-DarkMyVeryDarkDesaturatedBlue rounded-full w-5 h-5 mt-[2px] absolute ${item.completed ? 'hidden' : ''}` }/>
                                    <img src={iconChecked} className={`rounded-full w-3.5 h-3.5 my-auto  ${item.completed ? '' : 'hidden'}` } alt="icon of a checkmark"/>
                                </div>
                                <span className="text-xl ml-20">{item.text}</span>
                            </div>
                        ))}
                    </div>

                    ): (
                        <div className="flex flex-col bg-DarkMyVeryDarkDesaturatedBlue mt-8 rounded-t-md">
                             <p className="p-10">Empty list</p>
                        </div>
                    )}



                    <div className="flex flex-row bg-DarkMyVeryDarkDesaturatedBlue justify-around text-DarkMyVeryDarkGrayishBlue py-4 rounded-b-md">
                        <span>x items left</span>
                        <div className="mx-20">
                            <span className="text-MyBrightBlue cursor-pointer" onClick={displayAllItems}>All</span>
                            <span className="mx-5 hover:text-DarkMyLightGrayishBlue cursor-pointer" onClick={displayActiveItems}>Active</span>
                            <span className="hover:text-DarkMyLightGrayishBlue cursor-pointer" onClick={displayCompletedItems}>Completed</span>
                        </div>
                        <span className="hover:text-DarkMyLightGrayishBlue cursor-pointer" onClick={clearCompleted}>Clear Completed</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default App
