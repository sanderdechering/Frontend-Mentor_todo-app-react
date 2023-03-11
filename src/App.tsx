import './App.css'
import iconMoon from './assets/icon-moon.svg'
import iconSun from './assets/icon-sun.svg'
import iconChecked from './assets/icon-check.svg'
import backgroundImage_desktop_dark from './assets/bg-desktop-dark.jpg'
import {useState} from "react";
function App() {
    const numbers = [1, 2, 3, 4, 5];
    interface item {
        id: number,
        title: string,
        completed: boolean,
    }
    const [items, setItems] = useState([
        {
            text: 'title',
            completed: false
        },
        {
            text: 'hello',
            completed: false
        },
    ]);

    function addTodo(text: string) {
        const currentItem = [...items]; // get the specified item
        currentItem.push({text: text, completed: false})
        setItems(currentItem); // update the state with the new array
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

                    <div className="flex flex-col bg-DarkMyVeryDarkDesaturatedBlue mt-8 rounded-t-md">
                        {items.map((item, index) =>(
                            <div key={index} className={`py-4 border-b-[1px] border-DarkMyVeryDarkGrayishBlue flex flex-row ${item.completed ? 'line-through text-DarkMyVeryDarkGrayishBlue2' : ''}` }>
                                <div className={`flex justify-center ml-6  rounded-full w-6 h-6 absolute ${item.completed ? 'cursor-pointer bg-DarkMyDarkGrayishBlue bg-gradient-to-r from-GradientBlue to-GradientPurple' : 'cursor-pointer bg-DarkMyDarkGrayishBlue hover:bg-gradient-to-r from-GradientBlue to-GradientPurple'}\`` } onClick={() => toggleCompleted(index)}>
                                    <div className={`bg-DarkMyVeryDarkDesaturatedBlue rounded-full w-5 h-5 mt-[2px] absolute ${item.completed ? 'hidden' : ''}` }/>
                                    <img src={iconChecked} className={`rounded-full w-3.5 h-3.5 my-auto  ${item.completed ? '' : 'hidden'}` }/>
                                </div>
                                <span className="text-xl ml-20">{item.text}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-row bg-DarkMyVeryDarkDesaturatedBlue justify-around text-DarkMyVeryDarkGrayishBlue py-4 rounded-b-md">
                        <span>X items left</span>
                        <div className="mx-20">
                            <span className="text-MyBrightBlue cursor-pointer">All</span>
                            <span className="mx-5 hover:text-DarkMyLightGrayishBlue cursor-pointer">Active</span>
                            <span className="hover:text-DarkMyLightGrayishBlue cursor-pointer">Completed</span>
                        </div>
                        <span className="hover:text-DarkMyLightGrayishBlue cursor-pointer">Clear Completed</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default App
