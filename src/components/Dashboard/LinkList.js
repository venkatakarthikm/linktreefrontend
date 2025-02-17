import React, { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useAuth } from "../context/AuthContext";
import LinkForm from "./LinkForm";
import './LinkList.css';
import EditableLink from "./EditableLink";

const LinkList = () => {
    const { user } = useAuth();
    const [links, setLinks] = useState([]);

    // Fetch links
    const fetchLinks = async () => {
        try {
            const res = await axios.get(`https://linktree-mg98.onrender.com/api/links/${user.userId}`);
            setLinks(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    // Delete a link
    const deleteLink = async (id) => {
        try {
            await axios.delete(`https://linktree-mg98.onrender.com/api/links/${id}`);
            fetchLinks();
        } catch (err) {
            console.error(err);
        }
    };

    // Update link order
    const onDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedLinks = [...links];
        const [movedLink] = reorderedLinks.splice(result.source.index, 1);
        reorderedLinks.splice(result.destination.index, 0, movedLink);

        // Update the local state immediately
        setLinks(reorderedLinks);

        // Update the backend asynchronously
        axios.post("https://linktree-mg98.onrender.com/api/links/update-order", {
            links: reorderedLinks.map((link, index) => ({ ...link, order: index })),
        });
    };

    return (
        <div className="dashboard-container">
            <h1>{user.username}'s Links</h1>
            <LinkForm userId={user.userId} fetchLinks={fetchLinks} />

            {/* Drag-and-drop list */}
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="links">
                    {(provided) => (
                        <ul {...provided.droppableProps} ref={provided.innerRef} className="link-list">
                            {links.map((link, index) => (
                                <Draggable key={link._id} draggableId={link._id} index={index}>
                                    {(provided) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="link-item"
                                        >
                                            <EditableLink
                                                link={link}
                                                onDelete={() => deleteLink(link._id)}
                                                onUpdate={async (name, url) => {
                                                    try {
                                                        await axios.put(`https://linktree-mg98.onrender.com/api/links/${link._id}`, { name, url });
                                                        fetchLinks();
                                                    } catch (err) {
                                                        console.error(err);
                                                    }
                                                }}
                                            />
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default LinkList;