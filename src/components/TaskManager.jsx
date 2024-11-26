import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import "../index.css";

export default function TaskManager() {
    const [task, setTask] = useState({
        title:"",
        description:""
    })
    const [allTask, setAllTask] = useState([]);
    const [editFrom, setEditForm] = useState(false);
    const [editValues, setEditValues] = useState({
        id:"",
        title:"",
        description:""
    });

    async function handleChange(e) {

        const { name, value } = e.target;
        setTask((prevState) => ({
            ...prevState,
            [name]: value,
        }));

    }

    //////////addTask//////
    const addTask = async (e) => {
        e.preventDefault();
        console.log(task);
        
        try {
            const docRef = await addDoc(collection(db, "tasks"), {
                task: task,
            });
            fetchPost();
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    // to fetch the task
    const fetchPost = async () => {

        await getDocs(collection(db, "tasks"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setAllTask(newData);
                console.log(allTask, newData);
            })

    }

    useEffect(() => {
        fetchPost();
    }, [])

    //////////handleing edit
    function handleEdit(id, updatetedTitle,updatedDescription) {
        console.log(id);
        setEditForm(true);

        
        setEditValues({
            id:id,
            title:updatetedTitle,
            description:updatedDescription
        })

    }

    //////handling Edit Change /////
    function handleEditChange(e){
        const { name, value } = e.target;
        setEditValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    ////////updating to firbase
    
    async function editTask(id) {
        console.log(editValues);
        
        try {
            await updateDoc(doc(db, "tasks",id), {
                task: editValues,
            });
        
            fetchPost();
            setEditForm(false)

            //console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    async function handleDelete(id) {
        await deleteDoc(doc(db, "tasks", id));
        fetchPost();
    }

    return (
        <section className="todo-container">
            <div className="todo">
                <h1 className="header">
                    Task Manager
                </h1>


                {/* edit form */}
                {editFrom ? (
                    <div>

                        <div>
                            <input
                                type="text"
                                placeholder="What do you have to do today?"
                                defaultValue={editValues.title}
                                name="title"
                                onChange={handleEditChange}
                            />

                            <input
                                type="text"
                                
                                defaultValue={editValues.description}
                                name="description"
                                onChange={handleEditChange}
                            />

                        </div>

                        <div className="btn-container">
                            <button
                                type="submit"
                                className="btn"
                                onClick={() => editTask(editValues.id)}
                            >
                                Edit
                            </button>
                        </div>

                    </div>
                ) : (
                    <div>

                        <div>
                            <input
                                type="text"
                                placeholder="Enter title"
                                name="title"
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                placeholder="Write a short description"
                                name="description"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="btn-container">
                            <button
                                type="submit"
                                className="btn"
                                onClick={addTask}
                            >
                                Submit
                            </button>
                        </div>

                    </div>
                )}


                <div className="todo-content">

                    {
                        allTask?.map((taskItem, i) => (
                            <div key={i}>
                                <h3>{taskItem.task.title}</h3>
                                <p>{taskItem.task.description}</p>

                                <div>
                                    <EditIcon onClick={() => handleEdit(taskItem.id, taskItem.task.title,taskItem.task.description)} />
                                    <DeleteIcon onClick={() => handleDelete(taskItem.id)} />
                                </div> <hr /><br />
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
