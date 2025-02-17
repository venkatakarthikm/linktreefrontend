import React, { useState } from "react";

const EditableLink = ({ link, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(link.name);
    const [url, setUrl] = useState(link.url);

    const handleSave = async () => {
        try {
            await onUpdate(name, url); // Call the parent function to update the link
            setIsEditing(false); // Exit edit mode
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="editable-link">
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Link Name"
                    />
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Link URL"
                    />
                    <button onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        {name}
                    </a>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={onDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default EditableLink;